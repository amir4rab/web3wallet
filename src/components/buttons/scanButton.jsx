import React from 'react';
import Img from 'next/image'

import scanIcon from '../../../public/assets/icons/white/scan-icon.svg';

import { scanButtonStyles } from './buttons.module.scss';

function ScanButton({ onClick = null, disabled, type }) {
    return (
        <button className={ scanButtonStyles } onClick={ onClick } disabled={disabled} type={type}>
            <Img src={ scanIcon } />
        </button>
    )
}

export default ScanButton
