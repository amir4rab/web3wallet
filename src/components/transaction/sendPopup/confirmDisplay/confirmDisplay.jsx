import { useState, useCallback, useEffect, useContext } from 'react';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';

import { weiToEth } from '../../../../utils/global/convertor/convertor';
import generateWallet from '../../../../utils/frontend/walletGenerator/walletGenerator';
import { tokenTransaction } from '../../../../utils/global/transaction/tokenTransaction';
import { nativeTransaction } from '../../../../utils/global/transaction/nativeTransaction';
import { calcGas } from '../../../../utils/global/calcGas/calcGas';
import { shortenStringFloat } from '../../../../utils/global/shortenStringFloat/shortenStringFloat';
import { PendingTransactionsContext } from '../../../../providers/pendingTransactionsProvider/pendingTransactionsProvider';

import Loading from '../../../loading/loading';
import EButton from '../../../buttons/eButton';
import SButton from '../../../buttons/sButton';

import classes from './confirmDisplay.module.scss';

const getNetwork = (coinData) => {
    const networkType = 'test';
    const id = `${coinData.network}-${networkType}`;
    switch(id){
        case 'eth-main': return `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_MORALISNODESKEY}/eth/mainnet`;
        case 'eth-test': return `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_MORALISNODESKEY}/eth/rinkeby`;
        case 'polygon-main': return `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_MORALISNODESKEY}/polygon/mainnet`;
        case 'polygon-test': return `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_MORALISNODESKEY}/polygon/mumbai`;
    }
};

const checkIfHaveSufficientGas = (gasPrise, coinData) => {
    if( coinData.type === 'token' ) {
        const isSufficient = gasPrise.multipliedBy(24000).comparedTo(coinData.nativeCoinBalance);
        if( isSufficient <= 0 ) return true;
        return false;
    }
    if( coinData.type === 'native' ) {
        const isSufficient = gasPrise.multipliedBy(24000).comparedTo(coinData.balance);
        if( isSufficient <= 0 ) return true;
        return false;
    }
}

function ConfirmDisplay({ coinData, transactionData, selectedWallet, goBack, submitEvent }) {
    // visual states //
    const [ initialized, setInitialized ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    // logical states //
    const [ isTransactionPossible, setIsTransactionPossible ] = useState(true);
    // variable states //
    const [ readableAmount, setReadableAmount ] = useState(0);
    const [ networkFee, setNetworkFee ] = useState(0);
    const [ gasPrice, setGasPrice ] = useState(null); 
    const [ web3, setWeb3 ] = useState(null);
    // context providers //
    const { addPendingTransaction } = useContext(PendingTransactionsContext);

    const init = useCallback( async _ => { //* initial setup function *//
        // setting up web3 //
        const web3 = new Web3(getNetwork(coinData));
        const wallet = await generateWallet(selectedWallet.mnemonic);
        web3.eth.accounts.wallet.add(wallet.privateKey);
        setWeb3(web3);

        // calculating gasprice //
        const {
            higherGasPrice,
            networkFee,
        } = await calcGas(web3, coinData);
        setGasPrice(higherGasPrice.toString().split('.')[0]);
        setNetworkFee(shortenStringFloat(networkFee, 4));

        // final checks and state updates //
        setReadableAmount(weiToEth(transactionData.amount, coinData.decimals));
        setIsTransactionPossible(checkIfHaveSufficientGas(new BigNumber(higherGasPrice), coinData));        
        setInitialized(true);
    }, [ selectedWallet, coinData, transactionData ])
    
    
    useEffect( _ => { //* runs only after the first render *//
        if( !initialized ) init();
    }, [ init, initialized ]);


    const makeTheTransaction = async () => { //* sings transactions to the blockchain *//
        setIsLoading(true);
        let transaction;
        if( coinData.type === 'token' ) {
            transaction = await tokenTransaction(web3, transactionData.toAddress, gasPrice, transactionData.amount, coinData.tokenAddress);
        } else if ( coinData.type === 'native' ) {
            transaction = await nativeTransaction(web3, transactionData.toAddress, gasPrice, transactionData.amount )
        }
        const { successful, response } = transaction;
        console.log(successful, response, transactionData, coinData);
        addPendingTransaction({
            transactionHash: response.transactionHash,
            to: response.to,
            amount: transactionData.amount,
            symbol:  coinData.symbol,
            decimals: coinData.decimals
        })
        submitEvent(successful, response);
    }
    
    if( !initialized || isLoading ) return (
        <div className={ classes.centerLoading }><Loading /></div>
    );

    return (
        <div className={ classes.confirmDisplay }>
            <button onClick={ goBack } className={ classes.goBackBtn }>
                {'< Go back'}
            </button>
            <h3 className={ classes.title }>
                Confirm transaction
            </h3>
            <div className={ classes.details }>
                <div className={ classes.detailsBox }>
                    <p className={ classes.main }>
                        To:
                    </p>
                    <p className={ classes.sub }>
                        { transactionData.toAddress }
                    </p>
                </div>
                <div className={ classes.detailsBox }>
                    <p className={ classes.main }>
                        Amount:
                    </p>
                    <p className={ classes.sub }>
                        {
                            `${ shortenStringFloat(readableAmount) } ${ coinData.symbol.toUpperCase() }`
                        }
                    </p>
                    <p className={ classes.extra }>
                        {
                            `( ${(readableAmount * coinData.price).toFixed(2)}€  )`
                        }
                    </p>
                </div>
                <div className={ classes.detailsBox }>
                    <p className={ classes.main }>
                        Network fee:
                    </p>
                    <p className={ classes.sub }>
                        {
                            `${ networkFee } ${ coinData.network.toUpperCase() }`
                        }
                    </p>
                    <p className={ classes.extra }>
                        {
                            `( ${ (parseFloat(networkFee) * coinData.nativeCoinPrice).toFixed(2) }€  )`
                        }
                    </p>
                </div>
                <div className={ classes.error }>
                    {
                        !isTransactionPossible ? <p>Sorry, you dont have sufficient amount of { coinData.network.toUpperCase() }</p> : null
                    }
                </div>
                <div className={ classes.btnArea }>
                    <EButton fullWith onClick={ goBack }>
                        Cancel
                    </EButton>
                    <SButton fullWith disabled={ !isTransactionPossible } onClick={ makeTheTransaction }>
                        Confirm
                    </SButton>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDisplay;
