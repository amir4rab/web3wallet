import { Wallet } from "ethers";
import { validateMnemonic as validateMnemonicBip39 } from 'bip39';

export const generateWalletFromPrivateKey = (privateKey) => new Wallet(privateKey);
export const getPrivateKeysFromMnemonicAsync = async (mnemonic) => Wallet.fromMnemonic(mnemonic);

export const validateMnemonic = validateMnemonicBip39;

const generateWallet = ( input = null ) => {
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