import dynamic from 'next/dynamic';

import Popup from '../../popup/popup';
import Loading from '../../loading/loading';

const DynamicInnerPopup = dynamic(
    () => import('./innerReceivePopup.jsx'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Loading /> }
)

function ReceivePopup({ state, setState, address, symbol }) {
    return (
        <Popup isActive={state} setIsActive={setState} title='Receive'>
            <DynamicInnerPopup address={ address } symbol={ symbol } />
        </Popup>
    )
}

export default ReceivePopup
