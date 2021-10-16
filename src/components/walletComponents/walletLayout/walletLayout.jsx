import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import WalletNavbar from '../walletNavbar/walletNavbar';
import Loading from '../../loading/loading';

import { WalletsContext } from '../../../providers/walletsProvider/walletsProvider';

import classes from './walletLayout.module.scss';

function WalletLayout({ children }) {
    const { selectedWallet } = useContext(WalletsContext);
    const router = useRouter();

    useEffect( _ => {
        if ( selectedWallet === null ) router.push('/selectwallet');
    },[ selectedWallet, router ]);

    if( selectedWallet === null ) return (
        <div>
            <Loading />
        </div>
    )
    return (
        <div className={ classes.walletLayout }>
            {
                children
            }
            <WalletNavbar />
        </div>
    );
};

export default WalletLayout;
