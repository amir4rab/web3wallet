import Img from 'next/image';

import sendIcon from '../../../../public/assets/icons/colored/send-icon.svg'
import receiveIcon from '../../../../public/assets/icons/colored/receive-icon.svg';
import copyIcon from '../../../../public/assets/icons/colored/copy-icon.svg';

import classes from './buttonsArea.module.scss';

function ButtonsArea({ copyEvent, sendEvent, receiveEvent }) {
    return (
        <div className={ classes.buttonsArea }>
            <button className={ classes.button } onClick={ sendEvent }>
                <div className={ classes.imageWrapper }>
                    <Img src={ sendIcon } />
                </div>
                <p className={ classes.text }>
                    Send
                </p>
            </button>
            <button className={ classes.button } onClick={ receiveEvent }>
                <div className={ classes.imageWrapper }>
                    <Img src={ receiveIcon } />
                </div>
                <p className={ classes.text }>
                    Receive
                </p>
            </button>
            <button className={ classes.button } onClick={ copyEvent }>
                <div className={ classes.imageWrapper }>
                    <Img src={ copyIcon } />
                </div>
                <p className={ classes.text }>
                    Copy
                </p>
            </button>
        </div>
    );
};

export default ButtonsArea;
