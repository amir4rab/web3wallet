import { useEffect, useState, useCallback, createContext, useRef } from "react";
import { useRouter } from 'next/router';
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
    const router = useRouter();
    let isMounted = useRef(true);

    const fetchBalance = useCallback(async (address) => {
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
        const apiResponse = await fetch(`/api/prices`);
        const json = await apiResponse.json();
        return json;
    }

    const updateBalances = useCallback( async () => {
        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        const response = await fetchBalance(selectedWallet);
        if(!isMounted) return;
        setWalletBalances(response);
    }, [ fetchBalance ]);

    const updatePrices = useCallback( async () => {
        const response = await fetchPrices();
        if(!isMounted) return;
        setPrices(response);
    }, []);

    const init = useCallback( async () => {
        const idb = new Idb();
        await idb.init( 'settings', 'settings' );
        const { value: network } = await idb.get('network','settings');
        await idb.close(network);
        setNetwork(network);

        const selectedWallet = sessionStorage.getItem('selectedWalletAddress');
        if( selectedWallet === null || selectedWallet === undefined ) router.push('./selectwallet'); // re-directs user if there is no selected wallet //
        const [
            fetchedBalances,
            fetchedPrices
        ] = await Promise.all([fetchBalance(selectedWallet), fetchPrices()])

        if(!isMounted) return;
        setWalletBalances(fetchedBalances)
        setPrices(fetchedPrices)
        setIsLoading(false);
        setInitialized(true);

    },[ router, fetchBalance ]);

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
            isMounted.current = false;
        }
    },[ init, updateBalances, isMounted, initialized, updatePrices ]);

    const value = { // returned values from provider //
        walletBalances,
        isLoading,
        initialized,
        prices
    };

    return (
        <BalanceContext.Provider value={ value } > { children } </BalanceContext.Provider>
    )
}

export default BalanceProvider;