import Head from 'next/head';
import WalletComponent from '../../src/components/wallet/wallet';
import WalletLayout from '../../src/components/walletComponents/walletLayout/walletLayout';
import BalanceProvider from '../../src/providers/balanceProvider/balanceProvider';

function WalletPage() {
    return (
        <BalanceProvider>
            <WalletLayout>
                <Head>
                    <title>wallet</title>
                    <meta name="description" content="web3 hot wallet" />
                </Head>
                <WalletComponent />
            </WalletLayout>
        </BalanceProvider>
    );
};

export default WalletPage;
