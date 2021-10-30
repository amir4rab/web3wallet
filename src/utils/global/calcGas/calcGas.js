import BigNumber from "bignumber.js";
import erc20Abi from '../abi/erc20Abi';

export const calcGas = async ( web3, coinData, toAddress, amount ) => {
    let gasPrice;
    let gas;
    let higherGasPrice;
    let networkFee;

    if ( coinData.type === 'native' ) {
        gas = 2400;
        gasPrice = await web3.eth.getGasPrice();
        higherGasPrice = new BigNumber(gasPrice).multipliedBy(1.25).toString(10).split('.')[0];
        networkFee = new BigNumber(web3.utils.fromWei(higherGasPrice.toString().split('.')[0], 'ether'))
            .multipliedBy(1.25)
            .multipliedBy(24000).toString(10);
    }
    if ( coinData.type === 'token' ) {
        const erc20Contract = new web3.eth.Contract(erc20Abi, coinData.tokenAddress);
        gas = await erc20Contract.methods.transfer( toAddress, amount ).estimateGas();
        gasPrice = await web3.eth.getGasPrice();
        higherGasPrice = new BigNumber(gasPrice).multipliedBy(1.25).toString(10).split('.')[0];
        networkFee = new BigNumber(web3.utils.fromWei(higherGasPrice.toString().split('.')[0], 'ether'))
            .multipliedBy(1.25)
            .multipliedBy(gas).toString(10);
    }
    return ({
        gas,
        gasPrice,
        higherGasPrice,
        networkFee,
    });
};

export default calcGas;