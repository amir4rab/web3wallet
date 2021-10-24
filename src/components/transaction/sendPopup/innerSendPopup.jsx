import { useState } from 'react';

import InputForm from './inputForm/inputForm';
import ConfirmDisplay from './confirmDisplay/confirmDisplay';
import ConfirmedDisplay from './confirmedDisplay/confirmedDisplay';

import classes from './sendPopup.module.scss';


function SendPopup({ coinData, selectedWallet, coinId }) {
    const [ display, setDisplay ] = useState('inputs');

    const [ transactionDetails, setTransactionDetails ] = useState(null);

    const [ transactionResponse, setTransactionResponse ] = useState(null);

    const submitSend = ( toAddress, amount ) => {
        setTransactionDetails({
            toAddress,
            amount
        });
        setDisplay('confirm');
    }

    const goBack = () => setDisplay('inputs');

    const submitTransaction = ( successful, response ) => {
        setTransactionResponse({ successful, response });
        console.log('here!');
        setDisplay('confirmed');
    };

    const resetPopup = () => {
        setTransactionDetails(null);
        setTransactionResponse(null);
        setDisplay('inputs');
    }

    return (
        <div className={ classes.sendPopup }>
            <h2 className={ classes.title }>
                Send { coinData.symbol.toUpperCase() }
            </h2>
            {
                display === 'confirmed' ?
                <ConfirmedDisplay
                    transactionData={ transactionResponse.response }
                    transactionStatus={ transactionResponse.successful }
                    resetPopup={ resetPopup }
                    coinData={ coinData }
                /> : null
            }
            {
                display === 'inputs' ?
                <InputForm 
                    submitSend={ submitSend } 
                    coinData={ coinData } 
                /> : null
            }
            {
                display === 'confirm' ? 
                <ConfirmDisplay 
                    coinData={ coinData } 
                    transactionData={ transactionDetails } 
                    selectedWallet={ selectedWallet } 
                    goBack={ goBack }
                    submitEvent={ submitTransaction }
                    coinId={ coinId }
                /> : null
            }
        </div>
    );
};

export default SendPopup;
