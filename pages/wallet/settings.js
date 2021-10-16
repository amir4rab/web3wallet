import Head from 'next/head';
import Settings from '../../src/components/settings/settings';
import WalletLayout from '../../src/components/walletComponents/walletLayout/walletLayout';
import BalanceProvider from '../../src/providers/balanceProvider/balanceProvider';

function SettingsPage() {
    return (
        <BalanceProvider>
            <WalletLayout>
            <Head>
                <title>Wallet Settings</title>
            </Head>
            <Settings />
            </WalletLayout>
        </BalanceProvider>
    );
};

export default SettingsPage;