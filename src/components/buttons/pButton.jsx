import { pButton, fullWithPButton } from './buttons.module.scss';

const PButton = ({ onClick = null, children, fullWith, disabled })  => {
    return (
        <button className={ fullWith === true ? fullWithPButton : pButton } onClick={ onClick } disabled={disabled}>
            { children }
        </button>
    )
};

export default PButton;
