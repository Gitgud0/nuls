/*
 * *
 *  * MIT License
 *  *
 *  * Copyright (c) 2017-2018 nuls.io
 *  *
 *  * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  * of this software and associated documentation files (the "Software"), to deal
 *  * in the Software without restriction, including without limitation the rights
 *  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  * copies of the Software, and to permit persons to whom the Software is
 *  * furnished to do so, subject to the following conditions:
 *  *
 *  * The above copyright notice and this permission notice shall be included in all
 *  * copies or substantial portions of the Software.
 *  *
 *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  * SOFTWARE.
 *
 */

package io.nuls.consensus.poc.scheduler;

import io.nuls.consensus.poc.constant.ConsensusStatus;
import io.nuls.consensus.poc.context.ConsensusStatusContext;
import io.nuls.consensus.poc.context.PocConsensusContext;
import io.nuls.consensus.poc.manager.CacheManager;
import io.nuls.consensus.poc.manager.ChainManager;
import io.nuls.consensus.poc.process.*;
import io.nuls.consensus.constant.ConsensusConstant;
import io.nuls.consensus.poc.provider.OrphanBlockProvider;
import io.nuls.consensus.poc.task.*;
import io.nuls.consensus.poc.util.ProtocolTransferTool;
import io.nuls.core.tools.log.Log;
import io.nuls.kernel.context.NulsContext;
import io.nuls.kernel.exception.NulsRuntimeException;
import io.nuls.kernel.model.BlockHeader;
import io.nuls.kernel.model.Result;
import io.nuls.kernel.thread.manager.NulsThreadFactory;
import io.nuls.kernel.thread.manager.TaskManager;
import io.nuls.protocol.base.version.NulsVersionManager;
import io.nuls.protocol.base.version.ProtocolContainer;
import io.nuls.protocol.constant.ProtocolConstant;
import io.nuls.protocol.service.BlockService;
import io.nuls.protocol.storage.po.BlockProtocolInfoPo;
import io.nuls.protocol.storage.service.VersionManagerStorageService;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * @author ln
 */
public class ConsensusScheduler {

    private static ConsensusScheduler INSTANCE = new ConsensusScheduler();

    private ScheduledThreadPoolExecutor threadPool;

    private OrphanBlockProcess orphanBlockProcess;

    private CacheManager cacheManager;

    private VersionManagerStorageService versionManagerStorageService;

    private boolean protocolInited;

    private ConsensusScheduler() {
    }

    public static ConsensusScheduler getInstance() {
        return INSTANCE;
    }

    public boolean start() {

        ChainManager chainManager = new ChainManager();
        OrphanBlockProvider orphanBlockProvider = new OrphanBlockProvider();

        PocConsensusContext.setChainManager(chainManager);

        cacheManager = new CacheManager(chainManager);
        try {
            initDatas();
        } catch (Exception e) {
            Log.warn(e.getMessage());
        }

        threadPool = TaskManager.createScheduledThreadPool(6,
                new NulsThreadFactory(ConsensusConstant.MODULE_ID_CONSENSUS, "consensus-poll-control"));

        BlockProcess blockProcess = new BlockProcess(chainManager, orphanBlockProvider);
        threadPool.scheduleAtFixedRate(new BlockProcessTask(blockProcess), 1000L, 300L, TimeUnit.MILLISECONDS);

        ForkChainProcess forkChainProcess = new ForkChainProcess(chainManager);
        threadPool.scheduleAtFixedRate(new ForkChainProcessTask(forkChainProcess), 1000L, 1000L, TimeUnit.MILLISECONDS);

        orphanBlockProcess = new OrphanBlockProcess(chainManager, orphanBlockProvider);
        orphanBlockProcess.start();

        threadPool.scheduleAtFixedRate(new BlockMonitorProcessTask(new BlockMonitorProcess(chainManager)), 60, 60, TimeUnit.SECONDS);

        TaskManager.createAndRunThread(ConsensusConstant.MODULE_ID_CONSENSUS, "poc-reward-cache", new RewardStatisticsProcessTask(NulsContext.getServiceBean(RewardStatisticsProcess.class)));

        threadPool.scheduleAtFixedRate(new RewardCalculatorTask(NulsContext.getServiceBean(RewardStatisticsProcess.class)), ProtocolConstant.BLOCK_TIME_INTERVAL_SECOND, ProtocolConstant.BLOCK_TIME_INTERVAL_SECOND, TimeUnit.SECONDS);

        threadPool.scheduleAtFixedRate(new TxProcessTask(), 5, 1, TimeUnit.SECONDS);

        if (!protocolInited) {
            protocolInited = true;
            initNulsProtocol();
        }

        ConsensusProcess consensusProcess = new ConsensusProcess(chainManager);
        threadPool.scheduleAtFixedRate(new ConsensusProcessTask(consensusProcess), 1000L, 1000L, TimeUnit.MILLISECONDS);

        return true;
    }


    private void initNulsProtocol() {
        try {
            //针对第一版本升级时的特殊处理
            NulsVersionManager.init();
            BlockService blockService = NulsContext.getServiceBean(BlockService.class);
            if (NulsContext.MAIN_NET_VERSION == 1 && NulsContext.CURRENT_PROTOCOL_VERSION == 2) {

                long bestHeight = blockService.getBestBlockHeader().getData().getHeight();
                Long consensusVersionHeight = getVersionManagerStorageService().getConsensusVersionHeight();
                if (consensusVersionHeight == null) {
//                    consensusVersionHeight = 680000L;
                    consensusVersionHeight = 1L;
                } else {
                    long height = consensusVersionHeight + 1;
                    BlockProtocolInfoPo infoPo = null;
                    while (true) {
                        height--;
//                        if(height == 680000L) {
//                            break;
//                        }
                        if (height <= 0) {
                            break;
                        }
                        infoPo = getVersionManagerStorageService().getBlockProtocolInfoPo(height);
                        if (infoPo != null) {
                            consensusVersionHeight = height;
                            getVersionManagerStorageService().saveConsensusVersionHeight(height);
                            break;
                        }
                    }

                    if (infoPo != null) {
                        ProtocolContainer container = NulsVersionManager.getProtocolContainer(infoPo.getVersion());
                        ProtocolTransferTool.copyFromBlockProtocolInfoPo(infoPo, container);
                    }
                }
                for (long i = consensusVersionHeight+1; i <= bestHeight; i++) {
                    Result<BlockHeader> result = blockService.getBlockHeader(i);
                    if (result.isSuccess()) {
                        NulsProtocolProcess.getInstance().processProtocolUpGrade(result.getData());
                    }
                }
            } else {
                NulsVersionManager.loadVersion();
            }

        } catch (Exception e) {
            Log.error(e);
            System.exit(-1);
        }
    }

    public boolean restart() {
        clear();
        initDatas();

        return true;
    }

    public boolean stop() {

        clear();

        orphanBlockProcess.stop();
        threadPool.shutdown();

        return true;
    }

    private void initDatas() {
        try {
            ConsensusStatusContext.setConsensusStatus(ConsensusStatus.LOADING_CACHE);
            cacheManager.load();

            ConsensusStatusContext.setConsensusStatus(ConsensusStatus.WAIT_RUNNING);
        } catch (Exception e) {
            throw new NulsRuntimeException(e);
        }
    }

    private void clear() {
        cacheManager.clear();
    }

    private VersionManagerStorageService getVersionManagerStorageService() {
        if (versionManagerStorageService == null) {
            versionManagerStorageService = NulsContext.getServiceBean(VersionManagerStorageService.class);
        }
        return versionManagerStorageService;
    }
}