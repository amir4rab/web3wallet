import React from 'react'
import { useState, useRef } from 'react'

import PButton from '../buttons/pButton';

import classes from './passwordInput.module.scss';

function PasswordInput({ verifyPassword, submitLogin }) {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ isPasswordValid, setIsPasswordValid ] = useState(false);

    const passwordRef = useRef();

    const submitEvent = async (e) => {
        e.preventDefault();
        const isPasswordCurrent = await verifyPassword(passwordRef.current.value);
        
        console.log(isPasswordCurrent);
        if ( !isPasswordCurrent ) {
            setError('Password is false!');
            return;
        }
        
        submitLogin(passwordRef.current.value);
    }

    const inputEvent = () => {
        setIsPasswordValid(passwordRef.current.value.length > 7)
    }

    return (
        <div className={ classes.passwordInput }>
            <h3 className={ classes.subtitle }>
                Please re-enter your password
            </h3>
            <form onSubmit={ submitEvent }>
                <div className={ classes.boxInput }>
                    <label className={ classes.label }>
                        Password
                    </label>
                    <input 
                        onChange={ inputEvent } 
                        ref={ passwordRef } 
                        autoComplete="current-password" 
                        minLength="8" 
                        type={ !showPassword ? `password` : 'text' }
                    />
                </div>
                {
                    error !== null ?
                    <p className={ classes.error }>
                        { error }
                    </p> : null
                }
                <div className={ classes.btnArea }>
                    <button className={ classes.togglePassword } type="button" onClick={ _ => setShowPassword(!showPassword) }>
                        { 
                            !showPassword ? 'show password' : 'hide password'
                        }
                    </button>
                    <div className={ classes.breakLine } />
                    <PButton disabled={ !isPasswordValid } fullWith role="submit">
                        submit
                    </PButton>
                </div>
            </form>
        </div>
    )
}

export default PasswordInput
