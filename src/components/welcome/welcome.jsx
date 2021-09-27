import React from 'react';
import { useRouter } from 'next/router';
import Img from 'next/image';

import transactionIcon from '../../../public/assets/icons/white/transaction-icon.svg';
import swapIcon from '../../../public/assets/icons/white/swap-icon.svg';
import exportIcon from '../../../public/assets/icons/white/export-icon.svg';

import classes from './welcome.module.scss';
import PButton from '../buttons/pButton';

function WelcomeComponent() {
    const router = useRouter();

    return (
        <div className={ classes.welcome }>
            <h1 className={ classes.title }>
                Web3 Hot Wallet
            </h1>
            <div className={ classes.features }>
                <h3 className={ classes.subtitle }>
                    Features
                </h3>
                <ul className={ classes.list }>
                    <li className={ classes.item }>
                        <Img src={transactionIcon} />
                        <p>
                            Make transaction
                        </p>
                    </li>
                    <li className={ classes.item }>
                        <Img src={swapIcon} />
                        <p>
                            Swap assets
                        </p>
                    </li>
                    <li className={ classes.item }>
                        <Img src={exportIcon} />
                        <p>
                            Export your private keys
                        </p>
                    </li>
                </ul>
            </div>
            <div className={ classes.btnArea }>
                <PButton fullWith onClick={ _ => router.push('./restorewallet')}>
                    Restore your wallet
                </PButton>
                <br className={ classes.spacer }/>
                <PButton fullWith onClick={ _ => router.push('./gettingstarted')}>
                    Get started
                </PButton>
            </div>
        </div>
    )
}

export default WelcomeComponent;
