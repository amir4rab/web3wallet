import { useRef, useState, useCallback, useEffect } from 'react';
import QrCode from 'qrcode';
import Popup from '../../popup/popup';

import classes from './receivePopup.module.scss';


const qrCodeOptions = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    margin: 1,
    color: {
        dark: "#272727",
        light: "#eeeeee"
    }
}

function ReceivePopup({ state, setState, address, symbol }) {
    const canvasRef = useRef();
    const [ copied, setCopied ] = useState(false);
    let isMounted = useRef(true);

    const init = useCallback(async _ => {
        await QrCode.toCanvas(canvasRef.current, address, qrCodeOptions);
    },[ canvasRef, address ]);

    const copy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
    }

    useEffect( _ => {
        isMounted.current = true;
        if( copied ){
            const timeout = setTimeout(_ => {
                if(isMounted.current) setCopied(false);
            }, 5000)
            return () => {
                clearTimeout(timeout);
            }
        };
    }, [ copied ]);

    useEffect(() => {
        init();
        return () => {
            isMounted.current = false;
        }
    },[ init ]);

    return (
        <Popup isActive={state} setIsActive={setState} title='Receive'>
            <div className={ classes.receivePopup }>
                <div className={ classes.canvasArea }>
                    <canvas className={ classes.canvas } ref={ canvasRef } />
                </div>
                <h3 className={ classes.title }>
                    Your { symbol } wallet address
                </h3>
                <div className={ classes.addressArea }>
                    <p onClick={ copy }>
                        { address }
                    </p>
                </div>
                <div className={ classes.btnArea }>
                    <button onClick={ copy } className={ classes.copyBtn }>
                        {
                            copied ? `Your ${symbol} wallet has been copied!` : `Tap to copy the ${symbol} wallet Address`
                        }
                    </button>
                </div>
            </div>
        </Popup>
    );
};

export default ReceivePopup;
