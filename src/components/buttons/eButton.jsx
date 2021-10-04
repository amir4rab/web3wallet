import { eButton, fullWithEButton } from './buttons.module.scss';

function EButton({ onClick = null, children, fullWith, disabled, role }) {
    return (
        <button className={ fullWith === true ? fullWithEButton : eButton } onClick={ onClick } disabled={disabled} role={role}>
            { children }
        </button>
    )
};

export default EButton;
