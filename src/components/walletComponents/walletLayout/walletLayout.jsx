import WalletNavbar from '../walletNavbar/walletNavbar';

function WalletLayout({ children }) {
    return (
        <>
            {
                children
            }
            <WalletNavbar />
        </>
    );
};

export default WalletLayout;
