import { useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import { BalanceContext } from '../../providers/balanceProvider/balanceProvider';
import { SettingsContext } from '../../providers/settingsProvider/settingsprovider';

import Loading from '../loading/loading';
import dataFromCoinId from '../../utils/frontend/dataFromCoinId/dataFromCoinId';
import ItemCard from './itemCard/itemCard';
import PastTransactions from './pastTransactions/pastTransactions';
import ReceivePopup from './receivePopup/receivePopup';
import SendPopup from './sendPopup/sendPopup';
import ButtonsArea from './buttonsArea/buttonsArea';

import classes from './transaction.module.scss';

function Transaction({ coinId }) {
    const {  isLoading, prices, walletBalances } = useContext(BalanceContext);
    const { selectedWallet } = useContext(WalletsContext);
    const { settingsObj } = useContext(SettingsContext);

    const router = useRouter();
    const [ data, setData ] = useState(null);
    const [ showReceivePopupPopup, setShowReceivePopupPopup ] = useState(false);
    const [ showSendPopupPopup, setShowSendPopupPopup ] = useState(false);

    const init = useCallback( _ => {
        if( isLoading ) return;
        if( selectedWallet === undefined ) router.push('/selectwallet');
        setData(dataFromCoinId(coinId, walletBalances, prices, settingsObj.currency));
    }, [ router, selectedWallet, walletBalances, coinId, isLoading, prices, settingsObj ])

    useEffect(_ => {
        init();
    }, [ init ]);

    const copyEvent = () => {
        navigator.clipboard.writeText(selectedWallet.address);
    };

    const receiveEvent = () => setShowReceivePopupPopup(true);
    const sendEvent = () => setShowSendPopupPopup(true);


    if( isLoading || data === null ) return (
        <div className={ classes.transaction }>
            <Loading />
        </div>
    )

    return (
        <div className={ classes.transaction }>
            <ItemCard data={ data } />
            <ButtonsArea 
                copyEvent={ copyEvent } 
                receiveEvent={ receiveEvent }
                sendEvent={ sendEvent }
            />
            <PastTransactions 
                address={ selectedWallet.address } 
                data={ data } 
                coinId={ coinId } 
                network={ settingsObj.network }
            />
            {/* popups */}
            <ReceivePopup 
                state={ showReceivePopupPopup } 
                setState={ setShowReceivePopupPopup } 
                address={ selectedWallet.address } 
                symbol={ data.symbol.toUpperCase() } 
            />
            <SendPopup
                state={ showSendPopupPopup } 
                setState={ setShowSendPopupPopup } 
                coinData={ data }
                selectedWallet={ selectedWallet }
                coinId={ coinId }
            />
        </div>
    );
};

export default Transaction;
