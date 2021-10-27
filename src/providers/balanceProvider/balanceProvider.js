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

    const fetchBalance = useCallback(async (address) => {
        console.log(`fetching balances...`)
        let apiResponse;
        if( network === 'main' ) {
            apiResponse = await fetch(`/api/wallet/tbalance?wallet=${address}&network=${network}`);
        } else {
            apiResponse = await fetch(`/api/wallet/tbalance?wallet=${address}&network=test`);
        }
        const json = await apiResponse.json();
        return json;
    }, [ network ]);

    const fetchPrices = async () => {
        console.log(`fetching prices...`)
        const apiResponse = await fetch(`/api/prices`);
        const json = await apiResponse.json();
        return json;
    }

    const updateBalances = useCallback( async () => {
        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        const currentTime = new Date().valueOf();
        const response = await fetchBalance(selectedWallet);
        await idb.put({
            id: 'cachedBalances',
            value: {
                data: response,
                fetchTime: currentTime,
            }
        }, 'balances')
        if(!isMounted) return;
        setWalletBalances(response);
    }, [ fetchBalance, idb ]);

    const updatePrices = useCallback( async () => {
        const currentTime = new Date().valueOf();
        const response = await fetchPrices();
        await idb.put({
            id: 'cachedPrices',
            value: {
                data: response,
                fetchTime: currentTime,
            }
        }, 'balances')
        if(!isMounted) return;
        setPrices(response);
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
        const cachedBalances = await idb.get('cachedBalances', 'balances');

        if( ( currentTime - cachedBalances?.value?.fetchTime ) < balancesUpdateTime * 100 ) {
            setWalletBalances(cachedBalances.value.data);
        } else {
            fetchArr.push('balances')
        }
        // checking cached balances - ended //

        // checking cached prices - started //
        const cachedPrices = await idb.get('cachedPrices', 'balances');
        
        // console.log(isMounted);
        if( ( currentTime - cachedPrices?.value?.fetchTime ) < pricesUpdateTime * 100  ) {
            setPrices(cachedPrices.value.data);
        } else {
            fetchArr.push('prices')
        }
        // checking cached prices - ended //
        
        // fetching items which wasn't cached - started //
        const fetchItems = fetchArr.join('-');
        switch(fetchItems){
            case 'balances': {
                const fetchedBalances = await fetchBalance(selectedWallet);
                setWalletBalances(fetchedBalances);
                break;
            }
            case 'balances-prices': {
                const [
                    fetchedBalances,
                    fetchedPrices
                ] = await Promise.all([fetchBalance(selectedWallet), fetchPrices()]);
                setWalletBalances(fetchedBalances);
                setPrices(fetchedPrices);
                break;
            }
            case 'prices': {
                const fetchedPrices = await fetchPrices();
                setPrices(fetchedPrices);
                break;
            }
            default: break;
        }
        // fetching items which wasn't cached - ended //

        if(!isMounted.current) return;
        setIsLoading(false);
        setInitialized(true);

    },[ fetchBalance, idb ]);

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
        reInit
    };

    return (
        <BalanceContext.Provider value={ value } > { children } </BalanceContext.Provider>
    )
}

export default BalanceProvider;