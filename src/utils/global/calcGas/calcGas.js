import BigNumber from "bignumber.js";

export const calcGas = async ( web3, coinData, ) => {
    let gasPrice;
    let higherGasPrice;
    let networkFee;

    if ( coinData.type === 'native' ) {
        gasPrice = await web3.eth.getGasPrice();
        higherGasPrice = new BigNumber(gasPrice).multipliedBy(1.25).toString(10).split('.')[0];
        networkFee = new BigNumber(web3.utils.fromWei(higherGasPrice.toString().split('.')[0], 'ether'))
            .multipliedBy(1.25)
            .multipliedBy(24000).toString(10);
    }
    if ( coinData.type === 'token' ) {
        gasPrice = await web3.eth.getGasPrice();
        higherGasPrice = new BigNumber(gasPrice).multipliedBy(1.25).toString(10).split('.')[0];
        networkFee = new BigNumber(web3.utils.fromWei(higherGasPrice.toString().split('.')[0], 'ether'))
            .multipliedBy(1.25)
            .multipliedBy(48000).toString(10);
    }
    return ({
        gasPrice,
        higherGasPrice,
        networkFee,
    });
};

export default calcGas;