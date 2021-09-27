import { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import shortenAddress from '../../utils/frontend/shortenAddress/shortenAddress';

import classes from './selectWallet.module.scss';

function SelectWalletComponent() {
    const { wallets, setSelectedWallet, isLoggedIn, isNew } = useContext(WalletsContext);
    const router = useRouter();

    useEffect( _ => {
        if( !isLoggedIn ) router.push('/login');
    }, [ isLoggedIn, router ]);

    useEffect( _ => {
        if( isNew ) router.push('/welcome')
    },[ isNew, router ]);

    const selectWalletFunction = async (wallet) => {
        await setSelectedWallet(wallet);
        router.push('/wallet')
    }

    return (
        <div className={ classes.selectWallet }>
            <h1 className={ classes.title }>
                Select wallet
            </h1>
            <div className={ classes.wallets }>
                {
                    wallets.map(wallet => (
                        <div 
                            className={ classes.wallet }
                            key={ wallet.id } 
                            onClick={ _ => selectWalletFunction(wallet) }
                        >
                            { shortenAddress(wallet.address, 24) }
                        </div>
                    ))
                }
            </div>
            <div className={ classes.btnSection }>
                <button onClick={ _ => router.push('/welcome') } className={ classes.darkBtn }>
                    Create / Restore wallet
                </button>
            </div>
        </div>
    );
};

export default SelectWalletComponent;
