package io.nuls.ledger.event;

import io.nuls.core.event.NulsEventHeader;
import io.nuls.ledger.entity.AbstractCoinTransaction;

/**
 * Created by Niels on 2017/11/8.
 *
 */
public abstract class AbstractCoinTransactionEvent<T extends AbstractCoinTransaction> extends BaseLedgerEvent<T> {

    public AbstractCoinTransactionEvent(NulsEventHeader header) {
        super(header);
    }

}
