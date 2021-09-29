import { useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import shortenAddress from '../../utils/frontend/shortenAddress/shortenAddress';

import classes from './selectWallet.module.scss';
import Loading from '../loading/loading';

function SelectWalletComponent() {
    const { setSelectedWallet, isLoggedIn, isNew, getWallets } = useContext(WalletsContext);
    const router = useRouter();
    const [ wallets, setWallets ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( _ => {
        if( !isLoggedIn ) router.push('/login');
    }, [ isLoggedIn, router ]);

    useEffect( _ => {
        if( isNew ) router.push('/welcome');
    },[ isNew, router ]);

    const init = useCallback( async _ => {
            const wallets = await getWallets()
            setWallets(wallets);
            setIsLoading(false);
    }, [ getWallets ] );

    useEffect( _ => {
        init();
    },[ init ])

    const selectWalletFunction = async (wallet) => {
        await setSelectedWallet(wallet.id);
        router.push('/wallet')
    }

    if ( isLoading ) return (
        <div
            style={{
                minHeight: '95vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <Loading />
        </div>
    )

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
