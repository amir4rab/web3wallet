import { useState } from 'react';
import Img from 'next/image';

import copyIcon from '../../../public/assets/icons/white/copy-icon.svg';
import { copyButton } from './buttons.module.scss';

function CopyButton({ text }) {
    const [ copied, setCopied ] = useState(false)
    const clickEvent = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }

    return (
        <button className={ copyButton } onClick={ clickEvent }>
            <Img src={ copyIcon } />
            <p>
                {
                    copied ? 'Copied' : 'Copy'
                }
            </p>
        </button> 
    )
}

export default CopyButton
