package io.nuls.contract.vm.natives.io.nuls.contract.sdk;

import io.nuls.contract.entity.BlockHeaderDto;
import io.nuls.contract.sdk.Block;
import io.nuls.contract.vm.Frame;
import io.nuls.contract.vm.MethodArgs;
import io.nuls.contract.vm.ObjectRef;
import io.nuls.contract.vm.Result;
import io.nuls.contract.vm.code.MethodCode;
import io.nuls.contract.vm.code.VariableType;
import io.nuls.contract.vm.natives.NativeMethod;
import org.spongycastle.util.encoders.Hex;

import static io.nuls.contract.vm.natives.NativeMethod.SUCCESS;

public class NativeBlock {

    public static final String TYPE = "io/nuls/contract/sdk/Block";

    public static Result nativeRun(MethodCode methodCode, MethodArgs methodArgs, Frame frame, boolean check) {
        switch (methodCode.fullName) {
            case getBlockHeader:
                if (check) {
                    return SUCCESS;
                } else {
                    return getBlockHeader(methodCode, methodArgs, frame);
                }
            case currentBlockHeader:
                if (check) {
                    return SUCCESS;
                } else {
                    return currentBlockHeader(methodCode, methodArgs, frame);
                }
            default:
                frame.nonsupportMethod(methodCode);
                return null;
        }
    }

    public static final String getBlockHeader = TYPE + "." + "getBlockHeader" + "(J)Lio/nuls/contract/sdk/BlockHeader;";

    /**
     * native
     *
     * @see Block#getBlockHeader(long)
     */
    private static Result getBlockHeader(MethodCode methodCode, MethodArgs methodArgs, Frame frame) {
        long blockNumber = (long) methodArgs.invokeArgs[0];
        ObjectRef objectRef = getBlockHeader(blockNumber, frame);
        Result result = NativeMethod.result(methodCode, objectRef, frame);
        return result;
    }

    public static final String currentBlockHeader = TYPE + "." + "currentBlockHeader" + "()Lio/nuls/contract/sdk/BlockHeader;";

    /**
     * native
     *
     * @see Block#currentBlockHeader()
     */
    private static Result currentBlockHeader(MethodCode methodCode, MethodArgs methodArgs, Frame frame) {
        long blockNumber = frame.vm.getProgramContext().getNumber();
        ObjectRef objectRef = getBlockHeader(blockNumber, frame);
        Result result = NativeMethod.result(methodCode, objectRef, frame);
        return result;
    }

    private static ObjectRef getBlockHeader(long blockNumber, Frame frame) {

        String fieldName = "BlockHeader$" + blockNumber;
        Object object = frame.heap.getStatic(VariableType.BLOCK_HEADER_TYPE.getType(), fieldName);
        if (object != null) {
            return (ObjectRef) object;
        }

        BlockHeaderDto blockHeaderDto = frame.vm.getBlockHeader(blockNumber);

        if (blockHeaderDto != null) {
            ObjectRef objectRef = frame.heap.newObject(VariableType.BLOCK_HEADER_TYPE);
            frame.heap.putField(objectRef, "hash", frame.heap.newString(blockHeaderDto.getHash()));
            frame.heap.putField(objectRef, "time", blockHeaderDto.getTime());
            frame.heap.putField(objectRef, "height", blockHeaderDto.getHeight());
            ObjectRef packingAddress = frame.heap.newAddress(NativeAddress.toString(blockHeaderDto.getPackingAddress()));
            frame.heap.putField(objectRef, "packingAddress", packingAddress);
            String stateRoot = null;
            if (blockHeaderDto.getStateRoot() != null) {
                stateRoot = Hex.toHexString(blockHeaderDto.getStateRoot());
            }
            frame.heap.putField(objectRef, "stateRoot", frame.heap.newString(stateRoot));
            frame.heap.putStatic(VariableType.BLOCK_HEADER_TYPE.getType(), fieldName, objectRef);
            return objectRef;
        }

        return null;
    }

}
