import { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';

import shortenAddress from '../../../utils/frontend/shortenAddress/shortenAddress';

import { WalletsContext } from '../../../providers/walletsProvider/walletsProvider';
import { BalanceContext } from '../../../providers/balanceProvider/balanceProvider';

import classes from './walletsSettings.module.scss';

function WalletsSettings() {
    const {
        wallets,
        removeWallet,
        setSelectedWallet,
        selectedWallet
    } = useContext(WalletsContext);
    const { reInit: resetBalances } = useContext(BalanceContext);
    const router = useRouter();

    const selectWalletFunction = async (id) => {
        await setSelectedWallet(id);
        resetBalances();
    }

    const removeWalletFunction = async (id) => {
        let changePath = wallets.length === 1 ? true : false;
        removeWallet(id);
        if( changePath ) router.push('/selectwallet');
    }

    return (
        <div className={ classes.walletsSettings }>
            <h3 className={ classes.subtitle }>
                Manage Wallets
            </h3>
            <div className={ classes.box }>
                <h4 className={ classes.name }>
                    Your wallets
                </h4>
                <div className={ classes.wallets }>
                    {
                        wallets.map(wallet => {
                            return (
                                <div className={ selectedWallet.id !== wallet.id ? classes.wallet : classes.selectedWallet } key={ wallet.address }>
                                    <div className={ classes.address }>
                                        <p>{ shortenAddress(wallet.address) }</p>
                                    </div>
                                    <div className={ classes.btnArea }>
                                        <button onClick={ _ => selectWalletFunction(wallet.id) } className={ classes.gBtn }>
                                            Select
                                        </button>
                                        <button onClick={ _ => removeWalletFunction(wallet.id) } className={ classes.rBtn }>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={ classes.wallet }>
                        <div className={ classes.address }>
                            <p>New wallet</p>
                        </div>
                        <div className={ classes.btnArea }>
                            <button onClick={ _ => router.push('/welcome') } className={ classes.gBtn }>
                                Add
                            </button>
                            <button onClick={ _ => router.push('/welcome') } className={ classes.gBtn }>
                                Restore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletsSettings;
