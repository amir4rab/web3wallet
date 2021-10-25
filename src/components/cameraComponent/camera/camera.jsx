import { useEffect, useRef, useCallback } from "react";
import jsQR from "jsqr";

import classes from './camera.module.scss'

const CameraComponent = ({ setCamData, camState = false, setCamPermission, camPermission }) => {
    const streamRef = useRef();
    const videoRef = useRef();

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
            /* use the stream */
        } catch (err) {
            /* handle the error */
            console.error("ERR!");
        }
    }, [ setCamPermission ]);

    const closeMedia = useCallback( async () => {
        try {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            setCamPermission(false);
        } catch {}
    }, [ setCamPermission ]);

    useEffect( _ => {
        camState ? getMedia() : closeMedia();
    }, [ camState, getMedia, closeMedia ] );

    useEffect( _ => {
        let interval;
        if (camPermission) {
            interval = setInterval( _ => {
                const video = videoRef.current;
                const canvasElement = document.createElement("canvas");
                const canvas = canvasElement.getContext("2d");
                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
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
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [camPermission, setCamData] );

    const onLoadedMetadata = (e) => {
        e.target.play();
    };

    return (
        <video
            className={ classes.camera }
            style={{ display: camPermission ? "block" : "none" }}
            onLoadedMetadata={onLoadedMetadata}
            ref={videoRef}
        ></video>
    );
};

export default CameraComponent;
