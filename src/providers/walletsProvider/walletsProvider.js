import { useEffect, useState, useCallback, createContext } from "react";
import Idb from '../../utils/frontend/idb/idb';
import { decryptValue, encryptValue, encryptPassword, verifyPassword } from '../../utils/frontend/cryptoJs/cryptoJs';
import Loading from "../../components/loading/loading";

export const WalletsContext = createContext();

const WalletsProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ initialized, setInitialized ] = useState(false);

    const [ wallets, setWallets ] = useState([]);
    const [ password, setPassword ] = useState(null);

    const [ selectedWallet, setSelectedWallet ] = useState(null);

    const [ idb ] = useState(new Idb());
    const [ isNew, setIsNew ] = useState();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

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

                        const wallet = idbWallets.find(wallet => wallet.id === selectedWalletId);

                        if ( wallet !== undefined ) {
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
        setInitialized(true);
    }, [ idb ]);

    // const closeDb = useCallback( () => { // closes connection to IndexedDB //
    //     idb.close();
    // },[ idb ]);

    useEffect( _ => { // calls init function //
        if( !initialized ) initDbFn();
        // return () => {
        //     closeDb();
        // }
    },[ initDbFn, initialized ]);


    const setPasswordFn = async ( password ) => { // sets password to indexedDB //
        const passwordData = await encryptPassword(password);
        console.log({...passwordData});
        idb.set({
            ...passwordData,
            id: 'password'
        }, 'wallets');
        setPassword(password);
        setIsNew(false);
        setIsLoggedIn(true);
    };

    const addWallet = async ( wallet ) => { // adds new wallet //
        const walletId = wallet.address+(Math.floor(Math.random() * 10000000000)).toFixed(0);
        const { response: encryptedMnemonic } = await encryptValue(wallet.mnemonic, password);

        await idb.set({ // adding encrypted wallet to idb wallet arr //
            address: wallet.address,
            encryptedMnemonic,
            id: walletId
        }, 'wallets'); 

        setWallets(wallets => // adding encrypted wallet to providers wallet arr //
            ([ 
                ...wallets, 
                {
                    address: wallet.address,
                    encryptedMnemonic,
                    id: walletId
                }
            ])
        ); 

        setSelectedWallet({ // choosing wallet as provider's selected wallet //
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            id: walletId
        });

        const selectedId = `${walletId}`
        sessionStorage.setItem('selectedWalletId', selectedId);
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
        const selectedPassword = `${password}`
        sessionStorage.setItem('password', selectedPassword);
        setPassword(password);
        setIsLoggedIn(true);
    };

    const setSelectedWalletFn = async ( walletId ) => {
        const wallet = await idb.get(walletId, 'wallets');
        const { response } = await decryptValue(wallet.encryptedMnemonic, password);
        setSelectedWallet( _ => ({
            mnemonic: response,
            address: wallet.address,
            id: wallet.id
        }));
        sessionStorage.setItem('selectedWalletId', walletId);
    }

    const getWallets = async () => {
        const data = await idb.getAll('wallets');
        const idbWallets = data.filter(item => item.id !== 'password');
        return idbWallets;
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
        getWallets
    };

    return (
        <WalletsContext.Provider value={ value }>
            {
                isLoading ? 
                <div
                    style={{
                        minHeight: '95vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}
                >
                    <Loading />
                </div> : children
            }
        </WalletsContext.Provider>
    )
}

export default WalletsProvider;