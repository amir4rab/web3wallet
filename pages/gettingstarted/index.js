// import GettingStarted from "../../src/components/gettingStarted/gettingStarted";
import Head from 'next/head';
import WalletSetup from "../../src/components/walletSetup/walletSetup";

function GettingStartedPage() {
    return (
        <>
            <Head>
                <title>Getting started</title>
                <meta name="description" content="Generate your first web3 wallet" />
            </Head>
            <WalletSetup method="generate"/>
        </>
    )
};

export default GettingStartedPage;
