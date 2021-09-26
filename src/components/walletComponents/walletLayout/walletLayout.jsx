import React from 'react';
import BalanceProvider from '../../../providers/balanceProvider/balanceProvider';
import WalletNavbar from '../walletNavbar/walletNavbar';

function WalletLayout({ children }) {
    return (
        <BalanceProvider>
            {
                children
            }
            <WalletNavbar />
        </BalanceProvider>
    );
};

export default WalletLayout;
