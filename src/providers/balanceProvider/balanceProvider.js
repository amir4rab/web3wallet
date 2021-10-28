import { useEffect, useState, useCallback, createContext, useRef } from "react";
import LoadingIndicator from "../../components/loadingIndicator/loadingIndicator";
import Idb from '../../utils/frontend/idb/idb';

export const BalanceContext = createContext();

const balancesUpdateTime = 60000;
const pricesUpdateTime = 30000;


const BalanceProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ initialized, setInitialized ] = useState(false);
    const [ isInitializing, setIsInitializing ] = useState(false);

    const [ walletBalances, setWalletBalances ] = useState(null);
    const [ network, setNetwork ] = useState(null);
    const [ prices, setPrices ] = useState(null);

    const [ idb ] = useState(new Idb);
    let isMounted = useRef(true);

    const balancesIntervalRef = useRef();
    const pricesIntervalRef = useRef();

    const updateBalances = useCallback( async (caller = null) => {
        const currentTime = new Date().valueOf();

        // checking cached balances - started //
        const cachedBalances = await idb.get('cachedBalances', 'balances', true);
        const jsonCachedBalances = cachedBalances != undefined ? await JSON.parse(cachedBalances) : null;

        if( ( currentTime - jsonCachedBalances?.value?.fetchTime ) < balancesUpdateTime * 100 && jsonCachedBalances?.value.network === network ) {
            setWalletBalances(jsonCachedBalances.value.data);
            return;
        }
        // checking cached balances - ended //

        console.log(`updateBalances: ${caller}`)
        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        let apiResponse;
        if( network === 'main' ) {
            apiResponse = await fetch(`/api/wallet/tbalance?wallet=${selectedWallet}&network=main`);
        } else {
            apiResponse = await fetch(`/api/wallet/tbalance?wallet=${selectedWallet}&network=test`);
        }
        const response = await apiResponse.json();
        await idb.put({
            id: 'cachedBalances',
            value: {
                data: response,
                fetchTime: currentTime,
                network
            }
        }, 'balances')
        setWalletBalances(response);
        console.log(`cached ${network} Balances...`)
    }, [ network, idb ]);

    const updatePrices = useCallback( async () => {
        const currentTime = new Date().valueOf();

        // checking cached prices - started //
        const cachedPrices = await idb.get('cachedPrices', 'balances', true);
        const jsonCachedPrices = cachedPrices != undefined ? await JSON.parse(cachedPrices) : null;
        
        // console.log(isMounted);
        if( ( currentTime - jsonCachedPrices?.value?.fetchTime ) < pricesUpdateTime * 100  ) {
            setPrices(jsonCachedPrices.value.data);
            return;
        }
        // checking cached prices - ended //

        const apiResponse = await fetch(`/api/prices`);
        const response = await apiResponse.json();
        await idb.put({
            id: 'cachedPrices',
            value: {
                data: response,
                fetchTime: currentTime,
            }
        }, 'balances')
        setPrices(response);
        console.log('cached Prices...')
    }, [ idb ]);

    const init = useCallback( async () => {
        console.log('init is called!')
        if( isInitializing ) return;
        setIsInitializing(true);
        setIsLoading(true);
        clearInterval(balancesIntervalRef.current);
        clearInterval(pricesIntervalRef.current);

        // fetching settings - started //
        const settingsIdb = new Idb();
        await settingsIdb.init( 'settings', 'settings' );
        const { value: network } = await settingsIdb.get('network','settings');
        await settingsIdb.close(network);
        setNetwork(network);
        // fetching settings - ended //

        // variables - started //
        await idb.init('balancesProvider', 'balances');
        await Promise.all([updateBalances('init'), updatePrices()]);
        // variables - ended //
        

        
        balancesIntervalRef.current = setInterval(_ => {
            updateBalances('interval');
        }, balancesUpdateTime);
        pricesIntervalRef.current = setInterval(_ => {
            updatePrices('interval');
        }, pricesUpdateTime);

        if(!isMounted.current) return;
        setIsLoading(false);
        setInitialized(true);
        setIsInitializing(false);
        console.log('here!')
    },[ updateBalances, updatePrices, idb, isInitializing ]);

    const reInit = async () => {
        console.log('Re-initializing balance provider...')
        if( initialized ) await idb.deleteAll('balances');
        await init();
    };

    const reset = async () => { // clears cached data //
        console.log('Resetting balance provider...')
        if ( !initialized ) return;
        await idb.deleteAll('balances')
    }

    useEffect( _ => { // main loop //
        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        if( selectedWallet !== undefined && selectedWallet !== null && !initialized ) {
            console.log(`selectedWallet: ${selectedWallet}, initialized: ${initialized}`)
            init();
        }
    },[ init, initialized ]);

    useEffect(_ => { // unmount useEffect //
        return () => {
            isMounted.current = false;
            clearInterval(balancesIntervalRef.current);
            clearInterval(pricesIntervalRef.current);
        }
    }, []);

    const value = { // returned values from provider //
        walletBalances,
        isLoading,
        initialized,
        prices,
        reInit,
        init,
        reset
    };

    return (
        <BalanceContext.Provider value={ value } >
            <LoadingIndicator display={ isInitializing } />
            { children }
        </BalanceContext.Provider>
    )
}

export default BalanceProvider;