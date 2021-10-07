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
};

const arrToObj = (arr) => {
    const settingsObj = {
        network: null,
        currency: null
    };
    arr.forEach(item => {
        settingsObj[item.id] = item.value;
    })
    return settingsObj;
}

const SettingsProvider = ({ children }) => {
    const [ idb ] = useState(new Idb());
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ settingsArr, setSettingsArr ] = useState([]);
    const [ settingsObj, setSettingsObj ] = useState({});

    const init = useCallback( async _ => {
        await idb.init( 'settings', storeName );

        await initializeDatabase(idb);

        const data = await idb.getAll(storeName);

        setSettingsObj(arrToObj(data));
        setSettingsArr([...data])
        setIsInitialized(true);
    },[ idb ]);

    const changeSetting = async (newItem) => {
        await idb.put( newItem, storeName );
        setSettingsArr( pervArr => {
            const newArr = pervArr.filter(item => item.id !== newItem.id);
            newArr.push(newItem);
            setSettingsObj(arrToObj(newArr));
            return newArr;
        });
    }

    useEffect(_ => {
        if( !isInitialized ) init();
    }, [ isInitialized, init ]);

    const value = {
        settingsArr,
        changeSetting,
        isInitialized,
        settingsObj
    };

    return (
        <SettingsContext.Provider value={ value }>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;