import Head from 'next/head';
import SelectWalletComponent from '../../src/components/selectWallet/selectWallet';

function SelectWalletPage() {
    return (
        <>
            <Head>
                <title>select wallet</title>
            </Head>
            <SelectWalletComponent />
        </>
    )
}

export default SelectWalletPage;
