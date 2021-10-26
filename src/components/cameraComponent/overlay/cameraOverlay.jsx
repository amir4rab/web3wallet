import { useEffect, useState } from "react";
import Loading from "../../loading/loading";
import dynamic from 'next/dynamic';
import EButton from "../../buttons/eButton";

import { extractQrData } from "../../../utils/frontend/extractQrData/extractQrData";

import classes from './cameraOverlay.module.scss';

const DynamicCameraComponent = dynamic(
    () => import('../camera/camera'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Loading /> }
)

function CameraOverlay({ submitValue, overlayState= false, setOverlayState, network }) {
    const [ data, setData ] = useState(null);
    const [ camPermission, setCamPermission ] = useState(false);
    
    const close = () => {
        setOverlayState(false);
    }
    
    useEffect( _ => {
        if (data !== null) {
            const {
                status,
                address
            } = extractQrData(data, network);
            if( status === 'successful' ) {
                console.log(address)
                setOverlayState(false);
                setData(null)
                submitValue(address)
            } else {

            }
        }
    }, [ data, submitValue, setOverlayState, network ] );

    return (
        <div className={ overlayState ? classes.visibleCameraOverlay : classes.hiddenCameraOverlay }>
            <div className={ classes.inner }>
                <div  className={ classes.closeBtn }>
                    <EButton onClick={ close }>
                        close
                    </EButton>
                </div>
                {
                    camPermission ? null :
                    <div className={ classes.error }>
                        Camera permission is not granted
                    </div> 
                }
                {
                    overlayState ? 
                    <DynamicCameraComponent 
                        camPermission={ camPermission } 
                        setCamPermission={ setCamPermission } 
                        setCamData={ setData } 
                        camState={ overlayState } 
                    /> : null
                }
            </div>
        </div>
    );
};

export default CameraOverlay;
