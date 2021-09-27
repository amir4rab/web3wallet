import { useEffect, useState, useCallback, createContext } from "react";
import Idb from '../../utils/frontend/idb/idb';
import { decryptValue, encryptValue, encryptPassword, verifyPassword } from '../../utils/frontend/cryptoJs/cryptoJs';

export const WalletsContext = createContext();


const WalletsProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);

    const [ wallets, setWallets ] = useState([]);
    const [ password, setPassword ] = useState(null);

    const [ selectedWallet, setSelectedWallet ] = useState(null);


    const [ idb ] = useState(new Idb());
    const [ isNew, setIsNew ] = useState();
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);

    const initDbFn = useCallback( async () => { // initializes states //
        await idb.init( 'web3Wallet', 'wallets' );
        const passwordObj = await idb.get('password', 'wallets');

        const data = await idb.getAll('wallets');
        const idbWallets = data.filter(item => item.id !== 'password');
        setWallets(idbWallets);

        if ( passwordObj === undefined ) { // if user is completely new to this application //

            setIsNew(true);

        } else { // if user is a returning user //

            const sessionPassword = sessionStorage.getItem('password'); // checks if there is a password in session storage //

            if ( sessionPassword === undefined || sessionPassword === null  ){ // if there was no password //

                setIsLoggedIn(false);

            } else { // if there was a password //
                const isPasswordCorrect = await verifyPassword(sessionPassword, passwordObj.salt, passwordObj.hashedValue); // checks if the password is correct //
                if ( !isPasswordCorrect ) { // password wasn't correct //
                    setIsLoggedIn(false);
                } else { // password was correct //
                    setPassword(sessionPassword);
                    setIsLoggedIn(true);
                    const selectedWalletId = sessionStorage.getItem('selectedWalletId');

                    if ( selectedWalletId !== undefined || selectedWalletId !== null ) {

                        const wallet = idbWallets.find(wallet => wallet.id = selectedWalletId);

                        if ( wallet !== undefined ) {
                            console.log(wallet, sessionPassword)
                            const { response: decryptMnemonic } = await decryptValue(wallet.encryptedMnemonic, sessionPassword);
                            setSelectedWallet({
                                mnemonic: decryptMnemonic,
                                address: wallet.address,
                                id: wallet.id
                            });
                        }
                    }
                }
            }
            setIsNew(false)
        }
        setIsLoading(false);
        console.log('loaded!');
    }, [ idb ]);

    const closeDb = useCallback( () => { // closes connection to IndexedDB //
        idb.close();
    },[ idb ]);

    useEffect( _ => { // calls init function //
        initDbFn();
        return () => {
            closeDb();
        }
    },[ initDbFn, closeDb ]);


    const setPasswordFn = async ( password ) => { // sets password to indexedDB //
        const passwordData = await encryptPassword(password);
        console.log({...passwordData});
        idb.set({
            ...passwordData,
            id: 'password'
        }, 'wallets');
        setPassword(password);
        setIsNew(false);
    };

    const addWallet = async ( wallet ) => { // adds new wallet //
        const id = (Math.floor(Math.random() * 10000000000)).toFixed(0); 
        const { response: encryptedMnemonic } = await encryptValue(wallet.mnemonic, password);

        await idb.set({ // adding encrypted wallet to idb wallet arr //
            address: wallet.address,
            encryptedMnemonic,
            id
        }, 'wallets'); 

        setWallets(wallets => ([ // adding encrypted wallet to providers wallet arr //
            {
                address: wallet.address,
                mnemonic: encryptedMnemonic,
                id
            }, ...wallets
        ])); 

        setSelectedWallet({ // choosing wallet as provider's selected wallet //
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            id
        });
        
        sessionStorage.setItem('selectedWalletId', id);
    };

    const removeWallet = async ( walletId ) => { // removes wallet by the given id //
        try {
            await idb.delete(walletId, 'wallets');
            return 'Successfully removed wallet'
        } catch {
            return 'Something went wrong!'
        }
    };

    const verifyPasswordFn = async ( password ) => { // checks if user's password is correct //
        const passwordObj = await idb.get('password', 'wallets');
        const response = await verifyPassword(password, passwordObj.salt, passwordObj.hashedValue );
        return response;
    };

    const login = async ( password ) => { // set user's password to session storage and provider //
        sessionStorage.setItem('password', password);
        setPassword(password);
        setIsLoggedIn(true);
    };

    const setSelectedWalletFn = async ( wallet ) => {
        const decryptMnemonic = await decryptValue(wallet.encryptedMnemonic, password);
        setSelectedWallet({
            mnemonic: decryptMnemonic,
            address: wallet.address,
            id: wallet.id
        });
        sessionStorage.setItem('selectedWalletId', wallet.id);
    }

    const value = { // returned values from provider //
        //* application state variables *//
        isNew,
        isLoggedIn,
        //* idb variables and functions *//
        setPassword: setPasswordFn,
        removeWallet,
        addWallet,
        login,
        verifyPassword: verifyPasswordFn,
        //* wallets variables and functions *//
        wallets,
        setSelectedWallet: setSelectedWalletFn,
        selectedWallet,
    };

    return (
        <WalletsContext.Provider value={ value }>
            {
                isLoading ? <p>Loading...</p> : children
            }
        </WalletsContext.Provider>
    )
}

export default WalletsProvider;