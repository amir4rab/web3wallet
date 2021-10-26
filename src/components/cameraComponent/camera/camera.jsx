import { useEffect, useRef, useCallback } from "react";
import jsQR from "jsqr";

import classes from './camera.module.scss'

const timeOut = 500;
let lastAnimationFrame = null;

const CameraComponent = ({ setCamData, camState = false, setCamPermission, camPermission }) => {
    const streamRef = useRef();
    const videoRef = useRef();
    const animationRef = useRef();

    const scanImage = useCallback((timeStamp) => {
        if(( lastAnimationFrame === null || timeStamp - lastAnimationFrame > timeOut ) && camPermission ) {
            const video = videoRef.current;
            const canvasElement = document.createElement("canvas");
            const canvas = canvasElement.getContext("2d");
            canvasElement.height = video.videoHeight === 0 ? '100' : video.videoHeight;
            canvasElement.width = video.videoWidth === 0 ? '100' : video.videoWidth;
            canvas.drawImage(
                video,
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
            const imageData = canvas.getImageData(
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert"
            });
            if (code) {
                setCamData(code.data);
            }

            // scan image loop logic
            lastAnimationFrame = timeStamp;
            console.log(`Scanning`)
        }

        // animation controls
        animationRef.current = requestAnimationFrame(scanImage);
    }, [ setCamData, camPermission ])

    const getMedia = useCallback( async () => {
        const constraints = {
            video: {
                facingMode: "environment"
            }
        };
        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia(constraints);
            videoRef.current.srcObject = streamRef.current;
            setCamPermission(true);
            animationRef.current = requestAnimationFrame(scanImage);
            /* use the stream */
        } catch (err) {
            /* handle the error */
            console.error("Error in getMedia; camera.jsx:64");
        }
    }, [ setCamPermission, scanImage ]);

    const closeMedia = useCallback( async () => {
        try {
            setCamState(false);
            setCamPermission(false);
        } catch {
            /* handle the error */
            console.error("Error in closeMedia; camera.jsx:74");
        }
    }, [ setCamPermission ]);

    const init = useCallback( _ => camState ? getMedia() : closeMedia(), [ camState, getMedia, closeMedia ])

    useEffect( _ => {
        init();
        return () => {
            cancelAnimationFrame(animationRef.current)
            streamRef.current?.getTracks()?.forEach((track) => {
                track.stop();
            });
        }
    }, [ init ] );

    const onLoadedMetadata = (e) => {
        e.target.play();
    };

    return (
        <video
            className={ classes.camera }
            onLoadedMetadata={onLoadedMetadata}
            ref={videoRef}
        ></video>
    );
};

export default CameraComponent;
