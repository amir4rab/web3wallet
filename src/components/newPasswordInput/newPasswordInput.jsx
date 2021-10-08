import { useState, useRef } from 'react'

import PButton from '../buttons/pButton';

import classes from './newPasswordInput.module.scss';

function NewPasswordInput({ submitPassword }) {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ error, setError ] = useState(null);

    const passwordRef = useRef();
    const passwordRepeatRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        if ( passwordRef.current.value !== passwordRepeatRef.current.value ) {
            setError("Password and password repeat aren't equal!");
            return;
        }
        if ( passwordRef.current.value.length <= 8 ) {
            setError("Password should be at least 8 characters!");
            return;
        }
        submitPassword(passwordRef.current.value);
    }

    return (
        <div className={ classes.newPasswordInput }>
            <h3 className={ classes.subtitle }>
                Please chose a strong password
            </h3>
            <p className={ classes.paragraph }>
                This password will be asked on every login!
            </p>
            <form onSubmit={ submit }>
                <div className={ classes.boxInput }>
                    <label className={ classes.label }>
                        Password
                    </label>
                    <input 
                        ref={ passwordRef }  
                        type={ !showPassword ? `password` : 'text' } 
                        autoComplete="new-password" 
                        minLength="8"
                        required
                    />
                </div>
                <div className={ classes.boxInput }>
                    <label className={ classes.label }>
                        Repeat your password
                    </label>
                    <input 
                        ref={ passwordRepeatRef }  
                        type={ !showPassword ? `password` : 'text' } 
                        autoComplete="new-password" 
                        minLength="8"
                        required
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
                    <PButton fullWith>
                        submit
                    </PButton>
                </div>
            </form>
        </div>
    );
};

export default NewPasswordInput;
