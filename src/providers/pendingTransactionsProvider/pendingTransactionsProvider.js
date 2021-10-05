import { useEffect, useState, useCallback, createContext } from "react";
import Idb from '../../utils/frontend/idb/idb';

export const PendingTransactionsContext = createContext();

const pendingTransactionsStore = 'pendingTransactions';

const PendingTransactionsProvider = ({ children }) => {
    const [ idb ] = useState(new Idb());
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ pendingTransactions, setPendingTransaction ] = useState([]);

    const init = useCallback( async _ => {
        await idb.init( 'web3PTransactions', pendingTransactionsStore, 1, 'transactionHash' );

        const data = await idb.getAll(pendingTransactionsStore);

        setPendingTransaction([...data])
        setIsInitialized(true);
    },[ idb ]);

    useEffect(_ => {
        if( !isInitialized ) init();
    }, [ isInitialized, init ]);

    const addPendingTransaction = async (transactionObj) => {
        await idb.set( transactionObj, pendingTransactionsStore );
        
        setPendingTransaction( currArr => {
            return ([
                transactionObj,
                ...currArr
            ]);
        })
    }

    const removePendingTransaction = async (transactionHash) => {
        await idb.delete(transactionHash, pendingTransactionsStore);

        setPendingTransaction(currArr => {
            const filteredArr = currArr.filter(transactionObj => transactionObj.transactionHash !== transactionHash);
            return filteredArr;
        });
    }

    const filterTransaction = async ( completedPendedTransactions ) => { // private method used for filtering transactions //
        const filteredTransaction = pendingTransactions.filter( pTransaction => { // filtering to remove completed transactions //
            let isCompleted = false;
            completedPendedTransactions.every( cTransaction => {
                if( cTransaction.transactionHash === pTransaction.transactionHash ) {
                    isCompleted = true;
                    return false;
                }
                return true;
            });
            return !isCompleted;
        });

        await idb.deleteAll(pendingTransactionsStore);

        await idb.setArr(filteredTransaction, pendingTransactionsStore);

        setPendingTransaction([ ...filteredTransaction ])
    }

    const findCompletedTransactions = async ( completedTransactionsArr, transactionHashIdentifier ) => {
        const completedPendedTransactions = [];
        pendingTransactions.forEach( async pTransaction => { // finding pending transactions that has been completed //

            completedTransactionsArr.every(cTransaction => { // checking transaction hash of the completed transactions //
                if( cTransaction[transactionHashIdentifier] === pTransaction.transactionHash ) { // into this if check if the transaction is completed //
                    completedPendedTransactions.push(pTransaction);
                    return false; // ending the loop
                }

                return true; // continuing the loop
            });

        });
        return completedPendedTransactions;
    }

    const updatePendingTokenTransactions = async (completedTransactionsArr) => {
        const completedPendedTransactions = await findCompletedTransactions(completedTransactionsArr, 'transaction_hash');
        await filterTransaction(completedPendedTransactions)
    }

    const updatePendingNativeTransactions = async (completedTransactionsArr) => {
        const completedPendedTransactions = await findCompletedTransactions(completedTransactionsArr, 'hash');
        await filterTransaction(completedPendedTransactions)
    }

    const clearAllPendingTransactions = async () => {
        await idb.deleteAll(pendingTransactionsStore);

        setPendingTransaction([]);
    }

    const value = {
        pendingTransactions,
        addPendingTransaction,
        removePendingTransaction,
        updatePendingTokenTransactions,
        updatePendingNativeTransactions,
        clearAllPendingTransactions,
    };

    return (
        <PendingTransactionsContext.Provider value={ value }>
            {children}
        </PendingTransactionsContext.Provider>
    );
};

export default PendingTransactionsProvider;