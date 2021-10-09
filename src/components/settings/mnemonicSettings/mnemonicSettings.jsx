import { useState, useContext } from 'react';

import { WalletsContext } from '../../../providers/walletsProvider/walletsProvider';

import EButton from '../../buttons/eButton';

import classes from './mnemonicSettings.module.scss';

function MnemonicSettings() {
    const [ showMnemonic, setShowMnemonic ] = useState(false);
    const { selectedWallet } = useContext(WalletsContext);
    
    return (
        <div className={ classes.mnemonicSettings }>
            <h3 className={ classes.subtitle }>
                12 key phrases
            </h3>
            <div className={ classes.btnArea }>
                <EButton onClick={ _ => setShowMnemonic(!showMnemonic) }>
                    {
                        !showMnemonic ? 'show' : 'hide'
                    }
                </EButton>
            </div>
            <div className={ classes.mnemonic }>
                <div className={ !showMnemonic ? classes.hidden : classes.show }>
                    {
                        selectedWallet.mnemonic.split(' ').map((item, index) => (
                                <div 
                                    key={index}
                                    className={ classes.item }
                                >
                                    {`${index}) ${item}`}
                                </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MnemonicSettings;
