import { pButton, fullWithPButton } from './buttons.module.scss';

const PButton = ({ onClick = null, children, fullWith })  => {
    return (
        <button className={ fullWith === true ? fullWithPButton : pButton } onClick={ onClick }>
            { children }
        </button>
    )
};

export default PButton;
