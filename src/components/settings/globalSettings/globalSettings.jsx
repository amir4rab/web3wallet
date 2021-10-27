import { useContext, useState } from 'react';

import { BalanceContext } from '../../../providers/balanceProvider/balanceProvider';
import { SettingsContext } from '../../../providers/settingsProvider/settingsprovider';

import classes from './globalSettings.module.scss';

const objectifySettings = (settingsArr) => {
    const settingsObj = {
        network: null,
        currency: null
    };
    settingsArr.forEach(item => {
        settingsObj[item.id] = item.value;
    })
    return settingsObj;
}

const currencies = [
    {
        "id": 'eur',
        "name": 'Euro',
        "symbol": '€'
    },
    {
        "id": 'usd',
        "name": 'United States Dollar',
        "symbol": '$'
    },
    {
        "id": 'gbp',
        "name": 'United Kingdom Pound',
        "symbol": '£'
    },
    {
        "id": 'dkk',
        "name": 'Denmark Krone',
        "symbol": 'kr'
    },
    {
        "id": 'chf',
        "name": 'Switzerland Franc',
        "symbol": 'CHF'
    },
];

function GlobalSettings() {
    const { settingsArr, changeSetting } = useContext(SettingsContext);
    const { reInit: resetBalances } = useContext(BalanceContext);
    const [ settings ] = useState(objectifySettings(settingsArr));

    const changeHandler = async ( value, id ) => {
        changeSetting({
            id,
            value
        });
        if( id === 'network' ) await resetBalances();
    }


    return (
        <div className={ classes.globalSettings }>
            <h3 className={ classes.subtitle }>
                Global
            </h3>
            <div className={ classes.alignInLine }>
                <h4 className={ classes.settingName }>
                    Network
                </h4>
                <select
                    defaultValue={ settings.network } 
                    className={ classes.select } 
                    onChange={ e => changeHandler(e.target.value, 'network') }
                >
                    <option value='main'>
                        Main
                    </option>
                    <option value='test'>
                        Test
                    </option>
                </select>
            </div>
            <div className={ classes.alignInLine }>
                <h4 className={ classes.settingName }>
                    Currency
                </h4>
                <select 
                    defaultValue={ settings.currency }
                    className={ classes.select } 
                    onChange={ e => changeHandler(e.target.value, 'currency') }
                >
                    {
                        currencies.map(currency => (
                            <option key={ currency.id } value={ currency.id }>
                                { currency.name }
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default GlobalSettings;
