import { useEffect, useState, useCallback, createContext, useRef } from "react";
// import { useRouter } from 'next/router';
import Idb from '../../utils/frontend/idb/idb';

export const BalanceContext = createContext();

const balancesUpdateTime = 60000;
const pricesUpdateTime = 30000;


const BalanceProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ walletBalances, setWalletBalances ] = useState(null);
    const [ initialized, setInitialized ] = useState(false);
    const [ network, setNetwork ] = useState(null);
    const [ prices, setPrices ] = useState(null);
    const [ idb ] = useState(new Idb);
    let isMounted = useRef(true);

    const updateBalances = useCallback( async () => {
        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        const currentTime = new Date().valueOf();
        let apiResponse;
        if( network === 'main' ) {
            apiResponse = await fetch(`/api/wallet/tbalance?wallet=${selectedWallet}&network=${network}`);
        } else {
            apiResponse = await fetch(`/api/wallet/tbalance?wallet=${selectedWallet}&network=test`);
        }
        const response = await apiResponse.json();
        await idb.put({
            id: 'cachedBalances',
            value: {
                data: response,
                fetchTime: currentTime,
            }
        }, 'balances')
        setWalletBalances(response);
        console.log('cached Balances...')
    }, [ network, idb ]);

    const updatePrices = useCallback( async () => {
        const currentTime = new Date().valueOf();
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
        // fetching settings - started //
        const settingsIdb = new Idb();
        await settingsIdb.init( 'settings', 'settings' );
        const { value: network } = await settingsIdb.get('network','settings');
        await settingsIdb.close(network);
        setNetwork(network);
        // fetching settings - ended //

        // variables - started //
        const fetchArr = [];
        const currentTime = new Date().valueOf();
        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        await idb.init('balancesProvider', 'balances');
        // variables - ended //

        // checking cached balances - started //
        const cachedBalances = await idb.get('cachedBalances', 'balances', true);
        const jsonCachedBalances = cachedBalances != undefined ? await JSON.parse(cachedBalances) : null;

        if( ( currentTime - jsonCachedBalances?.value?.fetchTime ) < balancesUpdateTime * 100 ) {
            setWalletBalances(jsonCachedBalances.value.data);
        } else {
            fetchArr.push('balances')
        }
        // checking cached balances - ended //

        // checking cached prices - started //
        const cachedPrices = await idb.get('cachedPrices', 'balances', true);
        const jsonCachedPrices = cachedPrices != undefined ? await JSON.parse(cachedPrices) : null;
        
        // console.log(isMounted);
        if( ( currentTime - jsonCachedPrices?.value?.fetchTime ) < pricesUpdateTime * 100  ) {
            setPrices(jsonCachedPrices.value.data);
        } else {
            fetchArr.push('prices')
        }
        // checking cached prices - ended //
        
        // fetching items which wasn't cached - started //
        const fetchItems = fetchArr.join('-');
        console.log(`fetch items: ${fetchArr.join(' - ')}`);
        switch(fetchItems){
            case 'balances': {
                const fetchedBalances = await updateBalances(selectedWallet);
                setWalletBalances(fetchedBalances);
                break;
            }
            case 'balances-prices': {
                const [
                    fetchedBalances,
                    fetchedPrices
                ] = await Promise.all([updateBalances(selectedWallet), updatePrices()]);
                setWalletBalances(fetchedBalances);
                setPrices(fetchedPrices);
                break;
            }
            case 'prices': {
                const fetchedPrices = await updatePrices();
                setPrices(fetchedPrices);
                break;
            }
            default: break;
        }
        // fetching items which wasn't cached - ended //

        if(!isMounted.current) return;
        setIsLoading(false);
        setInitialized(true);

    },[ updateBalances, updatePrices, idb ]);

    const reInit = async () => {
        await idb.deleteAll('balances')
        setInitialized(false);
        setIsLoading(true);
    };

    useEffect( _ => {
        if ( !initialized ) {
            init();
        };
        const balancesInterval = setInterval(_ => {
            updateBalances();
        }, balancesUpdateTime);
        const pricesInterval = setInterval(_ => {
            updatePrices();
        }, pricesUpdateTime);
        return () => {
            clearInterval(balancesInterval);
            clearInterval(pricesInterval);
        }
    },[ init, updateBalances, isMounted, initialized, updatePrices ]);

    const reset = async () => { // clears cached data //
        await idb.deleteAll('balances')
    }

    useEffect(_ => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    const value = { // returned values from provider //
        walletBalances,
        isLoading,
        initialized,
        prices,
        reInit,
        reset
    };

    return (
        <BalanceContext.Provider value={ value } > { children } </BalanceContext.Provider>
    )
}

export default BalanceProvider;