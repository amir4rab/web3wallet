import { sButton, fullWithSButton } from './buttons.module.scss';

function SButton({ onClick = null, children, fullWith, disabled, role }) {
    return (
        <button className={ fullWith === true ? fullWithSButton : sButton } onClick={ onClick } disabled={disabled} role={role}>
            { children }
        </button>
    )
};

export default SButton;
