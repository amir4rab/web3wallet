import React from 'react';
import dynamic from 'next/dynamic';

import Popup from '../../popup/popup';
import Loading from '../../loading/loading';

const DynamicInnerPopup = dynamic(
    () => import ('./innerSendPopup.jsx'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Loading /> }
)


function SendPopup({ state, setState, coinData, selectedWallet, coinId }) {
    return (
        <Popup isActive={state} setIsActive={setState} title='Send'>
            <DynamicInnerPopup coinData={coinData} selectedWallet={selectedWallet} coinId={coinId} />
        </Popup>
    )
}

export default SendPopup
