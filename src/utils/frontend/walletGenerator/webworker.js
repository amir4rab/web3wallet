import { Wallet } from "ethers";

self.addEventListener('message', messageEvent => {
    const input = messageEvent.data;
    let wallet;
    if( input === null ){
        wallet = Wallet.createRandom();
    } else {
        wallet = Wallet.fromMnemonic(input);
    } 
    self.postMessage(
        JSON.stringify({
            mnemonic: wallet.mnemonic.phrase,
            privateKey: wallet.privateKey,
            address: wallet.address
        })
    );  
})