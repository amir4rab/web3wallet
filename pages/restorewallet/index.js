import Head from 'next/head';
import WalletSetup from '../../src/components/walletSetup/walletSetup';

function RestoreWalletPage() {
    return (
        <div>
            <Head>
                <title>restore wallet</title>
                <meta name="description" content="Generate your first web3 wallet" />
            </Head>
            <WalletSetup method='restore' />
        </div>
    );
};

export default RestoreWalletPage;
