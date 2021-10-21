import Head from 'next/head';
import Dex from '../../src/components/dex/dex';
import WalletLayout from '../../src/components/walletComponents/walletLayout/walletLayout';
import BalanceProvider from '../../src/providers/balanceProvider/balanceProvider';

function DexPage() {
    return (
        <BalanceProvider>
            <WalletLayout>
                <Head>
                    <title>Dex</title>
                </Head>
                <Dex />
            </WalletLayout>
        </BalanceProvider>
    )
}

export default DexPage;
