import erc20Abi from '../abi/erc20Abi';

export const tokenTransaction = async ( web3, to, gasPrice, value, contractAddress ) => {
    try{
        const erc20Contract = new web3.eth.Contract(erc20Abi, contractAddress);
        erc20Contract.options.gas = 48000;
        erc20Contract.options.gasPrice = gasPrice;
        const response = await erc20Contract.methods.transfer(to, value).send({ from: web3.eth.accounts.wallet[0].address });
        return ({
            response,
            successful: true
        });
    } catch {
        return ({
            response: null,
            successful: false
        });
    }
};

export default tokenTransaction;