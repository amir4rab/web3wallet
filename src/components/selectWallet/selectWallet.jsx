import { useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import { BalanceContext } from '../../providers/balanceProvider/balanceProvider';

import shortenAddress from '../../utils/frontend/shortenAddress/shortenAddress';
import pathFinder from '../../utils/frontend/pathFinder/pathFinder';

import classes from './selectWallet.module.scss';
import Loading from '../loading/loading';

function SelectWalletComponent() {
    const { setSelectedWallet, isLoggedIn, isNew, getWallets } = useContext(WalletsContext);
    const { reInit: intiBalances, isInitializing: balanceIsUpdating } = useContext(BalanceContext)
    const router = useRouter();
    const [ wallets, setWallets ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useState(_ => {
        router.push(pathFinder(isNew, isLoggedIn))
    }, [isNew, isLoggedIn, router])

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
        intiBalances();
        router.push('/wallet');
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
                {
                    !balanceIsUpdating ? null :
                    <p className={ classes.loading }>
                        Please wait until loading is finished!
                    </p>
                }
            </h1>
            <div className={ classes.wallets }>
                {
                    wallets.map(wallet => (
                        <button
                            role="link"
                            className={ classes.wallet }
                            key={ wallet.id } 
                            onClick={ _ => selectWalletFunction(wallet) }
                            disabled={ balanceIsUpdating }
                        >
                            { shortenAddress(wallet.address, 24) }
                        </button>
                    ))
                }
            </div>
            <div className={ classes.btnSection }>
                <button role="link" onClick={ _ => router.push('/welcome') } className={ classes.darkBtn }>
                    Create / Restore wallet
                </button>
            </div>
        </div>
    );
};

export default SelectWalletComponent;
