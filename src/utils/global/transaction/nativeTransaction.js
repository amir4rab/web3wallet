export const nativeTransaction = async ( web3, to, gasPrice, value ) => {
    try {
        const gas =  24000;
        const tx = await web3.eth.accounts.signTransaction(
            { 
                to,
                value,
                gas,
                gasPrice
            }, 
            web3.eth.accounts.wallet[0].privateKey
        )
        const response = await web3.eth.sendSignedTransaction(tx.rawTransaction);
        return ({
            response,
            successful: true
        })
    } catch {
        return ({
            response: null,
            successful: false
        })
    }
};

export default nativeTransaction;