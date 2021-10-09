import React from 'react';

import GlobalSettings from './globalSettings/globalSettings';
import ResetSettings from './resetSettings/resetSettings';
import WalletsSettings from './walletsSettings/walletsSettings';
import MnemonicSettings from './mnemonicSettings/mnemonicSettings';

import classes from './settings.module.scss';

function Settings() {
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
