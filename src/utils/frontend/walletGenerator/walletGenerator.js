import { Wallet } from "ethers";

export const generateWalletFromPrivateKey = (privateKey) => new Wallet(privateKey);
export const getPrivateKeysFromMnemonicAsync = async (mnemonic) => Wallet.fromMnemonic(mnemonic);

const generateWallet = ( input ) => {
    return new Promise((resolve, reject) => {
        const webworker = new Worker(new URL(`./webworker.js`, import.meta.url));
        webworker.postMessage(input)
        webworker.addEventListener('message', e => {
            webworker.terminate();
            resolve(JSON.parse(e.data));
        });
        webworker.addEventListener('error', e => {
            webworker.terminate();
            reject(JSON.parse(e.data));
        })
    })
};

export default generateWallet;