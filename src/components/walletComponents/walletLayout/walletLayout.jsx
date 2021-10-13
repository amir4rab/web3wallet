import WalletNavbar from '../walletNavbar/walletNavbar';

import classes from './walletLayout.module.scss';

function WalletLayout({ children }) {
    return (
        <div className={ classes.walletLayout }>
            {
                children
            }
            <WalletNavbar />
        </div>
    );
};

export default WalletLayout;
