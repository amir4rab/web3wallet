import { useEffect, useState, useCallback, useContext, memo } from 'react';
import Img from 'next/image';

import shortenAddress from '../../../utils/frontend/shortenAddress/shortenAddress';
import { weiToEth } from '../../../utils/global/convertor/convertor';
import { getBlockExplorer } from '../../../utils/global/getBlockExplorer/getBlockExplorer';
import Loading from '../../loading/loading';
import { PendingTransactionsContext } from '../../../providers/pendingTransactionsProvider/pendingTransactionsProvider';

import sendIcon from '../../../../public/assets/icons/white/send-icon.svg'
import receiveIcon from '../../../../public/assets/icons/white/receive-icon.svg';

import classes from './pastTransactions.module.scss';
import PendingTransactions from '../pendingTransactions/pendingTransactions';


const filterTransactions = ( arr, tokenAddress = null ) => {
    if( tokenAddress === null ) return arr.reverse().slice(0, 10);
    const filteredArr = arr.filter(transaction => transaction.address === tokenAddress);
    return filteredArr.slice(0, 10);
};

const transactionFetcher = async ( network, networkType, wallet, itemType ) => { // returns an array of transactions //
    const state = `${network}-${networkType}`;
    console.log(state)
    let response;
    if( itemType === "native" ){
        switch(state){
            case 'eth-main':{
                response = await fetch(`/api/transactions/native?wallet=${wallet}&network=eth`);
                break;
            }
            case 'eth-test':{
                response = await fetch(`/api/transactions/native?wallet=${wallet}&network=rinkeby`);
                break;
            }
            case 'matic-main':{
                response = await fetch(`/api/transactions/native?wallet=${wallet}&network=polygon`);
                break;
            }
            case 'matic-test':{ 
                response = await fetch(`/api/transactions/native?wallet=${wallet}&network=mumbai`);
                break;
            }
        };
    } else {
        switch(state){
            case 'eth-main':{
                response = await fetch(`/api/transactions/token?wallet=${wallet}&network=eth`);
                break;
            }
            case 'eth-test':{
                response = await fetch(`/api/transactions/token?wallet=${wallet}&network=rinkeby`);
                break;
            }
            case 'matic-main':{
                response = await fetch(`/api/transactions/token?wallet=${wallet}&network=polygon`);
                break;
            }
            case 'matic-test':{ 
                response = await fetch(`/api/transactions/token?wallet=${wallet}&network=mumbai`);
                break;
            }
        };
    }
    const json = await response.json();
    return json.result;
};

function PastTransactions({ address, data, coinId, network }) {
    const [ transactions, setTransactions ] = useState([]);
    const [ blockExplorer ] = useState(getBlockExplorer(data.network, network));
    const [ isLoading, setIsLoading ] = useState(true); 
    const [ isInitialized, setIsInitialized ] = useState(false);
    const { updatePendingTokenTransactions, updatePendingNativeTransactions } = useContext(PendingTransactionsContext);
    const init = useCallback( async () => {
            if( transactions.length !== 0 ) return;
            if( isInitialized ) return;
            const transactionsArr = await transactionFetcher( data.network, network, address, data.type );
            if( data.type === 'native' ) {
                updatePendingNativeTransactions(transactionsArr);
            } else {
                updatePendingTokenTransactions(transactionsArr);
            }
            setTransactions(filterTransactions(transactionsArr, data.tokenAddress));
            setIsLoading(false);
            setIsInitialized(true);
    }, [ data, address, transactions, isInitialized, updatePendingTokenTransactions, updatePendingNativeTransactions, network ]);
    
    useEffect( _ => {
        let timeout;
        if(!isInitialized) timeout = setTimeout( _ => init(), 150);
        return () => {
            clearTimeout(timeout)
        }
    },[ init, isInitialized ]);

    if( isLoading ) return (
        <div className={ classes.pastTransactions }>
            <h3 className={ classes.title }>
                Transaction history
            </h3>
            <div className={ classes.loading }>
                <Loading />
            </div>
        </div>
    )

    return (
        <div className={ classes.pastTransactions }>
            <PendingTransactions coinId={ coinId } coinData={ data } />
            <h3 className={ classes.title }>
                {
                    transactions.length === 0 ? 'Transaction history' : `Last ${transactions.length} transactions` 
                }
            </h3>
            <div>
                {
                    transactions.map(transaction => {
                        const sended = transaction.from_address.toLowerCase() === address.toLowerCase();
                        const value = weiToEth(transaction.value, data.decimals);
                        const transactionHash = data.type === 'token' ? 'transaction_hash' : 'hash';
                        return (
                            <div className={ classes.transaction } key={ transaction[transactionHash] }>
                                <a 
                                    href={ `${blockExplorer}/tx/${transaction[transactionHash]}` }
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <div className={ classes.imageWrapper }>
                                        <div className={ classes.circle }>
                                            {
                                                !sended ? 
                                                <Img src={ receiveIcon }/> 
                                                : 
                                                <Img src={ sendIcon }/>
                                            }
                                        </div>
                                    </div>
                                    <div className={ classes.details }>
                                        <h4 className={ classes.txType }>
                                            {
                                                !sended ? 
                                                'Received' 
                                                : 
                                                'Sended'
                                            }
                                        </h4>
                                        <p className={ classes.address }>
                                            {
                                                !sended ? 
                                                `From: ${shortenAddress(transaction.from_address, 8)}`
                                                : 
                                                `To: ${shortenAddress(transaction.to_address, 8)}` 
                                            }
                                        </p>
                                    </div>
                                    <div className={ classes.value }>
                                        {
                                            !sended ? 
                                            <p className={ classes.green }>{ value }{ data.symbol }</p> 
                                            :
                                            <p className={ classes.red }>{ value }{ data.symbol }</p>
                                        }
                                    </div>
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default PastTransactions
