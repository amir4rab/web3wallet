import { pButton, fullWithPButton } from './buttons.module.scss';

const PButton = ({ onClick = null, children, fullWith, disabled, role })  => {
    return (
        <button className={ fullWith === true ? fullWithPButton : pButton } onClick={ onClick } disabled={disabled} role={role}>
            { children }
        </button>
    )
};

export default PButton;
