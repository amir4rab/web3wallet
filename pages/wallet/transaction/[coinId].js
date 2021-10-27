import React from 'react';
import { useRouter } from 'next/router';

import BalanceProvider from '../../../src/providers/balanceProvider/balanceProvider';
import WalletLayout from '../../../src/components/walletComponents/walletLayout/walletLayout';
import Transaction from '../../../src/components/transaction/transaction';

function TransactionPage() {
    const router = useRouter()
    const { coinId } = router.query;
    
    return (
        <WalletLayout>
            <Transaction coinId={ coinId } />
        </WalletLayout>
    );
};

export default TransactionPage;

