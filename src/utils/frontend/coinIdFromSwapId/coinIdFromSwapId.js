export const coinIdFromSwapId = (coinId, network) => {
    if( coinId === network ) return `${network}`;
    return `${network}-${coinId}`;
};

export default coinIdFromSwapId;