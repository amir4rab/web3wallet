import React from 'react';
import { useRouter } from 'next/router';

import BalanceProvider from '../../../src/providers/balanceProvider/balanceProvider';
import WalletLayout from '../../../src/components/walletComponents/walletLayout/walletLayout';
import Transaction from '../../../src/components/transaction/transaction';

function TransactionPage() {
    const router = useRouter()
    const { coinId } = router.query;
    
    return (
        <Transaction coinId={ coinId } />
    );
};

export default TransactionPage;

TransactionPage.getLayout = function getLayout(page){
    return (
        <BalanceProvider>
            <WalletLayout>
                { page }
            </WalletLayout>
        </BalanceProvider>
    )
}
