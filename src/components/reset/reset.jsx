import { useState, useContext } from 'react';
import { useRouter } from 'next/dist/client/router';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import { SettingsContext } from '../../providers/settingsProvider/settingsprovider';
import { PendingTransactionsContext } from '../../providers/pendingTransactionsProvider/pendingTransactionsProvider';

import EButton from '../buttons/eButton';

import classes from './reset.module.scss';
import Loading from '../loading/loading';

function Reset() {
    const { reset: resetWallets } = useContext(WalletsContext);
    const { reset: resetSettings } = useContext(SettingsContext);
    const { clearAllPendingTransactions: resetPendingTransactions } = useContext(PendingTransactionsContext);
    const [ isAgreed, setIsAgreed ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    
    const resetFunction = async () => {
        setIsLoading(true);
        await resetSettings();
        await resetWallets();
        await resetPendingTransactions();
        router.push('/');
    }

    if( isLoading ) return (
        <div className={ classes.centeredLoading }>
            <Loading />
        </div>
    )

    return (
        <div className={ classes.reset }>
            <h1 className={ classes.title }>
                Reset your wallet
            </h1>
            <p className={ classes.paragraph }>
                Completely reset your wallet by clicking the button. <br />
                keep in mind after resetting your wallet, all of your wallets will be <b>removed</b>, and you need to restore them by the <b>12 word key phrases</b>.
            </p>
            <div className={ classes.checkboxWrapper }>
                <input onChange={ e => setIsAgreed(e.target.checked) } id='checkbox' type="checkbox" />
                <label htmlFor="checkbox">I want to remove all of my wallets</label>
            </div>
            <div className={ classes.btnArea }>
                <EButton fullWith disabled={ !isAgreed } onClick={ resetFunction }>
                    Reset my wallet
                </EButton>
            </div>
        </div>
    );
};

export default Reset;
