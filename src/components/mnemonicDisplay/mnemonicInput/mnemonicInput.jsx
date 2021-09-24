import classes from './mnemonicInput.module.scss';

function MnemonicInput({ refLink, index, onChangeEvent, error = null }) {
    return (
        <div className={ classes.mnemonicInput }>
            <label>{index}</label>
            <input onChange={ onChangeEvent } className={ error === null ? classes.input : classes.falseInput } type="text" ref={ refLink } />
        </div>
    )
}

export default MnemonicInput
