import { useEffect, useState, useCallback, createContext } from "react";
import Idb from '../../utils/frontend/idb/idb';

export const SettingsContext = createContext();

const storeName = 'settings';

const initializeDatabase = async ( idb ) => {
    const network = await idb.get( 'network', storeName );

    if ( network === undefined ) {
        await idb.setArr (
            [
                {
                    "value": 'test',
                    "id": 'network'
                },
                {
                    "value": 'eur',
                    "id": 'currency'
                },
            ]
        , storeName);
    }
}

const SettingsProvider = ({ children }) => {
    const [ idb ] = useState(new Idb());
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ settingsArr, setSettingsArr ] = useState([]);

    const init = useCallback( async _ => {
        await idb.init( 'settings', storeName );

        await initializeDatabase(idb);

        const data = await idb.getAll(storeName);

        setSettingsArr([...data])
        setIsInitialized(true);
    },[ idb ]);

    const changeSetting = async (newItem) => {
        await idb.put( newItem, storeName );
        setSettingsArr( pervArr => {
            const filteredArr = pervArr.filter(item => item.id !== newItem.id);
            filteredArr.push(newItem);
            return filteredArr;
        })
    }

    useEffect(_ => {
        if( !isInitialized ) init();
    }, [ isInitialized, init ]);

    const value = {
        settingsArr,
        changeSetting,
        isInitialized
    };

    return (
        <SettingsContext.Provider value={ value }>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;