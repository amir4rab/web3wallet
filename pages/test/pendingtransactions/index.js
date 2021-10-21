import { useContext, useRef } from 'react';
import { PendingTransactionsContext } from '../../../src/providers/pendingTransactionsProvider/pendingTransactionsProvider';

const randomString = (length = 8) => {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Pick characters randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

function PendingTransactionsPage() {
    const {
        pendingTransactions,
        addPendingTransaction,
        removePendingTransaction,
        updatePendingTransactions,
        clearAllPendingTransactions,
    } = useContext(PendingTransactionsContext);
    const transactionHashInputRef = useRef();
    const transactionHashTextareaRef = useRef();

    const add = () => {
        addPendingTransaction({
            transactionHash: '0x' + randomString(64)
        })
    };

    const remove = () => {
        removePendingTransaction(transactionHashInputRef.current.value);
    };

    const update = () => {
        const arr = transactionHashTextareaRef.current.value.split(',')
        const jsonArr = arr.map(item => {
            const items = item.split(':');
            return ({
                [items[0]]: items[1]
            })
        })
        updatePendingTransactions(jsonArr);
    };

    return (
        <>
            <div>
                <div>
                    <button onClick={ add }>
                        Add 
                    </button>
                </div>
                <div>
                    <button onClick={ clearAllPendingTransactions }>
                        Clear all  
                    </button>
                </div>
                <div>
                    <input ref={ transactionHashInputRef } placeholder='transaction hash' />
                    <button onClick={ remove }>
                        Remove 
                    </button>
                </div>
                <div>
                    <textarea ref={ transactionHashTextareaRef } />
                    <br/>
                    <button onClick={ update }>
                        Update 
                    </button>
                </div>
            </div>
            <div>
                {
                    pendingTransactions.map(item => <div key={ item.transactionHash }>{ item.transactionHash }</div>)
                }
            </div>
        </>
    );
};

export default PendingTransactionsPage;
