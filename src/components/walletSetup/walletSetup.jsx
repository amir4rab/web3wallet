/* eslint-disable react/display-name */
import { useContext } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import Loading from '../loading/loading';
// import MnemonicDisplay from '../mnemonicDisplay/mnemonicDisplay';
// import NewPasswordInput from '../newPasswordInput/newPasswordInput';
// import PasswordInput from '../passwordInput/passwordInput';

import classes from './walletSetup.module.scss';

const DynamicMnemonicDisplay = dynamic(
    () => import('../mnemonicDisplay/mnemonicDisplay'),
    { loading: () => <Loading /> }
)
const DynamicNewPasswordInput = dynamic(
    () => import('../newPasswordInput/newPasswordInput'),
    { loading: () => <Loading /> }
)
const DynamicPasswordInput = dynamic(
    () => import('../passwordInput/passwordInput'),
    { loading: () => <Loading /> }
)

function WalletSetup({ method }) {
    const {
        isNew: isNewUser,
        setPassword,
        addWallet,
        isLoggedIn,
        login,
        verifyPassword
    } = useContext(WalletsContext);
    const router = useRouter();

    const submitPassword = (password) => {
        setPassword(password);
    };

    const submitLogin = (password) => {
        login(password)
    }

    const submitEvent = async ( wallet ) => {
        await addWallet(wallet);
        router.push('./selectwallet');
    }

    return (
        <div className={ classes.walletSetup }>
            <h1 className={ classes.title }>
                {
                    method === 'generate' ? 'Getting started' : null
                }
                {
                    method === 'restore' ? 'Restore your wallet' : null
                }
            </h1>
            {
                !isLoggedIn ? 
                <> 
                    {
                        isNewUser ? 
                        <DynamicNewPasswordInput submitPassword={ submitPassword } /> :
                        <DynamicPasswordInput verifyPassword={ verifyPassword } submitLogin={ submitLogin } />
                    }
                </> : null
            }
            {
                isLoggedIn ? <DynamicMnemonicDisplay submitEvent={ submitEvent } method={ method } /> : null
            }
        </div>
    );
};

export default WalletSetup;
