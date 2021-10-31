import { useState, useEffect, useCallback, useRef } from 'react';
import generateWallet, { validateMnemonic } from '../../utils/frontend/walletGenerator/walletGenerator';
import CopyButton from '../buttons/copyButton';
import PButton from '../buttons/pButton';
import Loading from '../loading/loading';

import classes from './mnemonicDisplay.module.scss';
import MnemonicInput from './mnemonicInput/mnemonicInput';

const mnemonicStrToArr = ( mnemonic ) => {
    const res = mnemonic.split(' ');
    return res;
}

function MnemonicDisplay({ method, submitEvent }) {
    const [ isLoading, setIsLoading ] = useState(true);

    const [ completedInputs, setCompletedInputs ] = useState(false);
    const [ agreed, setAgreed ] = useState(false);

    const [ mnemonic, setMnemonic ] = useState([]);
    const [ mnemonicStr, setMnemonicStr ] = useState([]);

    const [ wallet, setWallet ] = useState(null);

    const [ falseMnemonic, setFalseMnemonic ] = useState(false);

    const init = useCallback( async () => {
            if ( method === 'generate' ){
                const generatedMnemonic = await generateWallet();
                setMnemonicStr(generatedMnemonic.mnemonic)
                setMnemonic(mnemonicStrToArr(generatedMnemonic.mnemonic));
                setWallet({
                    address: generatedMnemonic.address,
                    mnemonic: generatedMnemonic.mnemonic,
                });
                setIsLoading(false);
            }
            if( method === 'restore' ){
                setIsLoading(false) 
            }
    }, [ method ]);

    const wordRef1 = useRef();
    const wordRef2 = useRef();
    const wordRef3 = useRef();
    const wordRef4 = useRef();
    const wordRef5 = useRef();
    const wordRef6 = useRef();
    const wordRef7 = useRef();
    const wordRef8 = useRef();
    const wordRef9 = useRef();
    const wordRef10 = useRef();
    const wordRef11 = useRef();
    const wordRef12 = useRef();

    useEffect( _ => {
        init();
    }, [ init ]);

    const inputChangeEvent = () => {
        if( wordRef1.current.value.length === 0 ) return;
        if( wordRef2.current.value.length === 0 ) return; 
        if( wordRef3.current.value.length === 0 ) return; 
        if( wordRef4.current.value.length === 0 ) return; 
        if( wordRef5.current.value.length === 0 ) return; 
        if( wordRef6.current.value.length === 0 ) return; 
        if( wordRef7.current.value.length === 0 ) return; 
        if( wordRef8.current.value.length === 0 ) return; 
        if( wordRef9.current.value.length === 0 ) return; 
        if( wordRef10.current.value.length === 0 ) return; 
        if( wordRef11.current.value.length === 0 ) return; 
        if( wordRef12.current.value.length === 0 ) return; 
        setCompletedInputs(true);
    };

    const submitNewWallet = () => {
        submitEvent(wallet)
    };

    const submitRestoreWallet = async () => {
        setIsLoading(true);
        const restoredMnemonicString = `${wordRef1.current.value} ${wordRef2.current.value} ${wordRef3.current.value} ${wordRef4.current.value} ${wordRef5.current.value} ${wordRef6.current.value} ${wordRef7.current.value} ${wordRef8.current.value} ${wordRef9.current.value} ${wordRef10.current.value} ${wordRef11.current.value} ${wordRef12.current.value}`;

        if ( !validateMnemonic(restoredMnemonicString.toLocaleLowerCase()) ) { 
            setFalseMnemonic(true);
            setIsLoading(false);
            return;
        }

        const restoredWallet = await generateWallet(restoredMnemonicString.toLocaleLowerCase());
        submitEvent({
            address: restoredWallet.address,
            mnemonic: restoredWallet.mnemonic,
        })
    }

    if ( isLoading === true ) return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <Loading />
        </div>)
    ;
    
    return (
        <>
            {
                method === 'generate' ?
                <div className={ classes.mnemonicDisplay }>
                    <div className={ classes.mnemonics }>
                        {
                            mnemonic.map((word, i) => <p className={ classes.mnemonic } key={i}>{i+1} {word}</p>)
                        }
                    </div>
                    <div className={ classes.footer }>
                        <CopyButton text={ mnemonicStr } />
                        <div className={ classes.dis }>
                            <input id="disclaimer" onClick={ e => setAgreed(e.target.checked) } type="checkbox" />
                            <label htmlFor="disclaimer">
                                i have stored my backup phrases, securely.
                            </label>
                        </div>
                        <PButton fullWith disabled={ !agreed } onClick={ submitNewWallet }>
                            Done
                        </PButton>
                    </div>
                </div> : null
            } 
            {
                method === 'restore' ? 
                <div className={ classes.mnemonicDisplay }>
                    <div className={ classes.mnemonics }>
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef1} index={1} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef2} index={2} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef3} index={3} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef4} index={4} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef5} index={5} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef6} index={6} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef7} index={7} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef8} index={8} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef9} index={9} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef10} index={10} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef11} index={11} />
                        <MnemonicInput onChangeEvent={ inputChangeEvent } refLink={wordRef12} index={12} />
                    </div>
                    {
                        falseMnemonic ? <p className={ classes.error }>Sorry, something is wrong with your 12 key phrase, please type it again!</p> : null
                    }
                    <div className={ classes.footer }>
                        <PButton fullWith disabled={ !completedInputs } onClick={ submitRestoreWallet }>
                            Done
                        </PButton>
                    </div>
                </div> : null
            }
        </>
    );
};

export default MnemonicDisplay;
