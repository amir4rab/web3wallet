import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import PasswordInput from '../passwordInput/passwordInput';
import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';

import classes from './login.module.scss';

function LoginComponent() {
    const {
        isLoggedIn,
        login,
        verifyPassword,
        isNew
    } = useContext(WalletsContext);
    const router = useRouter();


    const submitLogin = async (value) => {
        await login(value);
        router.push('/selectwallet');
    }

    useEffect( _ => {
        if( isLoggedIn ) router.push('/selectwallet')
    }, [ isLoggedIn, router ]);

    useEffect( _ => {
        if( isNew ) router.push('/welcome')
    }, [ isNew, router ]);

    return (
        <div className={ classes.login }>
            <h1 className={ classes.title }>
                Login
            </h1>
            <PasswordInput verifyPassword={ verifyPassword } submitLogin={ submitLogin } />
            <div className={ classes.resetText }>
                <p>
                    Forgot your password?
                </p>
                <p>
                    <Link href='/reset'>reset your wallet</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginComponent;
