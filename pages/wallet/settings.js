import Head from 'next/head';
import Settings from '../../src/components/settings/settings';
import WalletLayout from '../../src/components/walletComponents/walletLayout/walletLayout';
import BalanceProvider from '../../src/providers/balanceProvider/balanceProvider';

function SettingsPage() {
    return (
        <>
            <Head>
                <title>Wallet Settings</title>
            </Head>
            <Settings />
        </>
    );
};

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page){
    return (
        <BalanceProvider>
            <WalletLayout>
                { page }
            </WalletLayout>
        </BalanceProvider>
    )
}