import { useRef, useState, useEffect } from 'react';
import PButton from '../../../buttons/pButton';
import { weiToEth, ethToWei } from '../../../../utils/global/convertor/convertor';

import classes from './inputForm.module.scss';
import { BigNumber } from 'bignumber.js';

function InputForm({ coinData, submitSend }) {
    const [ amount, setAmount ] = useState(0);
    const [ toAddress, setToAddress ] = useState('');
    const amountRef = useRef();
    const [ error, setError ] = useState(null);
    const [ completed, setCompleted ] = useState(false);
    const [ inFiat, setInFiat ] = useState(false);

    useEffect( _ => {
        if ( amount <= 0 || toAddress.length !== 42 ) {
            setCompleted(false);
        } else {
            setCompleted(true);
        };
    }, [ amount, toAddress ]);

    const errorCheck = () => {
        if( !inFiat ) {
            const amountBignumber = new BigNumber(amount);
            const balanceBignumber = new BigNumber(weiToEth(coinData.balance, coinData.decimals))
            if( amountBignumber.comparedTo(balanceBignumber) > 0 ) {
                setError(`Sorry, your balance is less than ${amountBignumber.toString(10)}${coinData.symbol}`);
                setCompleted(false);
                return false;
            }
        } else {
            const amountBignumber = new BigNumber(amount);
            const balanceBignumber = new BigNumber(coinData.value)
            if( amountBignumber.comparedTo(balanceBignumber) > 0 ) {
                setError(`Sorry, your balance is less than ${amount}€`);
                setCompleted(false);
                return false;
            }
        }
        setError(null);
        return true;
    };


    const submit = (e) => {
        e.preventDefault();
        if(!errorCheck()) return;
        let amountInToken;
        if ( inFiat ) {
            amountInToken = ethToWei( amount / coinData.price, coinData.decimals );
        } else {
            amountInToken = ethToWei( amount, coinData.decimals );
        }
        submitSend( toAddress, amountInToken );
    };

    return (
        <form onSubmit={ submit } className={ classes.inputForm }>
            <div className={ classes.inputBox }>
                <label className={ classes.label }>
                    To
                </label>
                <input 
                    className={ classes.input } 
                    type="text"
                    spellCheck='false'
                    value={ toAddress }
                    onChange={ e => setToAddress(e.target.value) }
                    required 
                />
            </div>
            <div className={ classes.inputBox }>
                <label className={ classes.label }>
                    Amount
                </label>
                <input 
                    className={ classes.input } 
                    type="number"
                    value={ amount }
                    onChange={ e => setAmount(e.target.value) }
                    required 
                />
                <div className={ classes.options }>
                    <div className={ classes.switchBox }>
                        <label className={ classes.inlineLabel }>{ coinData.symbol.toUpperCase() }</label>
                        <label className={ classes.switch }>
                            <input onChange={ e => setInFiat(e.target.checked) } type="checkbox" />
                            <span className={ classes.slider }></span>
                        </label>
                        <label className={ classes.inlineLabel }>Fiat</label>
                    </div>
                    <button 
                        type='button'
                        className={ classes.textBtn }
                        onClick={ _ => {
                            !inFiat ? 
                            amountRef.current = setAmount(weiToEth(coinData.balance, coinData.decimals))
                            :
                            amountRef.current = setAmount(coinData.value)
                        }}
                    >
                        Use max amount
                    </button>
                </div>
            </div>
            <div className={ classes.error }>
                {
                    error !== null ? <p>{ error }</p> : null
                }
            </div>
            <PButton fullWith role='submit' disabled={ !completed }>
                Next
            </PButton>
        </form>
    );
};

export default InputForm;
