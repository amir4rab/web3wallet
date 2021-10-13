import { useContext } from 'react';

import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';

import GlobalSettings from './globalSettings/globalSettings';
import ResetSettings from './resetSettings/resetSettings';
import WalletsSettings from './walletsSettings/walletsSettings';
import MnemonicSettings from './mnemonicSettings/mnemonicSettings';
import Loading from '../loading/loading';

import classes from './settings.module.scss';

function Settings() {
    const { selectedWallet } = useContext(WalletsContext);

    if( selectedWallet === null ) return (
        <>
            <Loading />
        </>
    )

    return (
        <div className={ classes.settings }>
            <h1 className={ classes.title }>
                Settings
            </h1>
            <GlobalSettings />
            <WalletsSettings />
            <MnemonicSettings />
            <ResetSettings />
        </div>
    );
};

export default Settings;
