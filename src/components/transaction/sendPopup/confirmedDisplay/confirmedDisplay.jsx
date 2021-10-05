import React from 'react';
import { getBlockExplorer } from '../../../../utils/global/getBlockExplorer/getBlockExplorer';

import SButton from '../../../buttons/sButton';
import EButton from '../../../buttons/eButton';

import classes from './confirmedDisplay.module.scss';

function ConfirmedDisplay({ transactionData, transactionStatus, resetPopup, coinData }) {
    if( !transactionStatus ) return (
        <div className={ classes.failed }>
            <h2 className={ classes.title }>
                Sorry your transaction has been failed.
            </h2>
            <EButton fullWith onClick={ resetPopup }>
                Click here to reset
            </EButton>
        </div>
    );

    return (
        <div className={ classes.successful }>
            <h2 className={ classes.title }>
                Transaction completed successfully.
            </h2>
            <div className={ classes.detailBox }>
                <h4>
                    Tx:
                </h4>
                <p>
                    { transactionData.transactionHash }
                </p>
            </div>
            <div className={ classes.detailBox }>
                <h4>
                    To:
                </h4>
                <p>
                    { transactionData.to }
                </p>
            </div>
            <div className={ classes.blockExplorer }>
                <a 
                    href={`${getBlockExplorer(coinData.network, 'test')}/tx/${transactionData.transactionHash}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    See the transaction
                </a>
            </div>
            <SButton fullWith onClick={ resetPopup }>
                Done
            </SButton>
        </div>
    );
};

export default ConfirmedDisplay;
