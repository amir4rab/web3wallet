import { useContext } from 'react';
import Img from 'next/image';

import shortenAddress from '../../../utils/frontend/shortenAddress/shortenAddress';
import { PendingTransactionsContext } from '../../../providers/pendingTransactionsProvider/pendingTransactionsProvider';
import { weiToEth } from '../../../utils/global/convertor/convertor';
import { getBlockExplorer } from '../../../utils/global/getBlockExplorer/getBlockExplorer';

import sendIcon from '../../../../public/assets/icons/yellowed/send-icon.svg';

import classes from './pendingTransactions.module.scss';

function PendingTransactions({ coinData }) {
    const { pendingTransactions } = useContext(PendingTransactionsContext);
    
    if( pendingTransactions.length === 0 ) return (null);
    return (
        <div className={ classes.pendingTransactions }>
            <h3 className={ classes.title }>
                Pending transaction
            </h3>
            <div>
                {
                    pendingTransactions.map(transaction => {
                        console.log(transaction.symbol, coinData.symbol)
                        if( transaction.symbol !== coinData.symbol ) return null;
                        const value = weiToEth(transaction.amount, transaction.decimals);
                        return (
                            <div className={ classes.transaction } key={ `pending-${transaction.transactionHash}` }>
                                <a 
                                    href={ `${getBlockExplorer(coinData.network, 'test')}/tx/${transaction.transactionHash}` }
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <div className={ classes.imageWrapper }>
                                        <div className={ classes.circle }>
                                                <Img src={ sendIcon }/>
                                        </div>
                                    </div>
                                    <div className={ classes.details }>
                                        <h4 className={ classes.txType }>
                                            Sended
                                        </h4>
                                        <p className={ classes.address }>
                                            `To: ${shortenAddress(transaction.to, 8)}` 
                                        </p>
                                    </div>
                                    <div className={ classes.value }>
                                        <p>{ value }{ transaction.symbol.toUpperCase() }</p> 
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

export default PendingTransactions
