import Img from 'next/image';
import { useRouter } from 'next/router';

import settingWhiteIcon from '../../../../public/assets/icons/white/settings-icon.svg';
import settingColoredIcon from '../../../../public/assets/icons/colored/settings-icon.svg';
import transactionWhiteIcon from '../../../../public/assets/icons/white/transaction-icon.svg';
import transactionColoredIcon from '../../../../public/assets/icons/colored/transaction-icon.svg';
import swapWhiteIcon from '../../../../public/assets/icons/white/swap-icon.svg';
import swapColoredIcon from '../../../../public/assets/icons/colored/swap-icon.svg';
import backWhiteIcon from '../../../../public/assets/icons/white/back-icon.svg';
import backColoredIcon from '../../../../public/assets/icons/colored/back-icon.svg';

import classes from './walletNavbar.module.scss'

function WalletNavbar() {
    const router = useRouter();

    return (
        <div className={ classes.navbarWrapper }>
            <div className={ classes.walletNavbar }>
                <div className={ classes.buttonWrapper }>
                    <button 
                        onClick={ _ => router.push('/wallet') } 
                        className={ router.pathname === '/wallet' ? classes.activeButton : classes.button }
                    >
                        <div className={ classes.ActiveImg }>
                            <Img src={ transactionColoredIcon }/> 
                        </div>
                        <div className={ classes.img }>
                            <Img src={ transactionWhiteIcon }/>
                        </div>
                            
                    </button>
                </div>
                <div className={ classes.buttonWrapper }>
                    <button 
                        onClick={ _ => router.push('/wallet/dex') } 
                        className={ router.pathname.includes('/wallet/dex') ? classes.activeButton : classes.button }
                    >
                        <div className={ classes.ActiveImg }>
                            <Img src={ swapColoredIcon }/> 
                        </div>
                        <div className={ classes.img }>
                            <Img src={ swapWhiteIcon }/>
                        </div>
                    </button>
                </div>
                <div className={ classes.buttonWrapper }>
                    <button 
                        onClick={ _ => router.push('/wallet/settings') } 
                        className={ router.pathname.includes('/wallet/settings') ? classes.activeButton : classes.button }
                    >
                        <div className={ classes.ActiveImg }>
                            <Img src={ settingColoredIcon }/>
                        </div>
                        <div className={ classes.img }>
                            <Img src={ settingWhiteIcon }/>
                        </div>
                    </button>
                </div>
                <div className={ classes.backButtonWrapper }>
                    <button 
                        onClick={ _ => router.back() } 
                        className={ classes.button }
                    >
                        <div className={ classes.ActiveImg }>
                            <Img src={ backColoredIcon }/>
                        </div>
                        <div className={ classes.img }>
                            <Img src={ backWhiteIcon }/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WalletNavbar;
