import { useEffect, useState, useCallback, createContext, useContext, useRef } from "react";
import { WalletsContext } from '../walletsProvider/walletsProvider'
import { useRouter } from 'next/router';

export const BalanceContext = createContext();

const balancesUpdateTime = 60000;
const pricesUpdateTime = 30000;


const BalanceProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ walletBalances, setWalletBalances ] = useState(null);
    const [ initialized, setInitialized ] = useState(false);
    const [ selectedWallet, setSelectedWallet ] = useState(null);
    const [ prices, setPrices ] = useState(null);
    const router = useRouter();
    let isMounted = useRef(true);
    

    const fetchBalance = async (address) => {
        const apiResponse = await fetch(`/api/wallet/tbalance?wallet=${address}&network=testnet`);
        const json = await apiResponse.json();
        return json;
    }

    const fetchPrices = async () => {
        const apiResponse = await fetch(`/api/prices`);
        const json = await apiResponse.json();
        console.log('prices fetched!')
        return json;
    }

    const updateBalances = useCallback( async () => {
        const response = await fetchBalance(selectedWallet);
        if(!isMounted) return;
        setWalletBalances(response);
    }, [ selectedWallet ]);

    const updatePrices = useCallback( async () => {
        const response = await fetchPrices();
        if(!isMounted) return;
        setPrices(response);
    }, []);


    const init = useCallback( async () => {
        if( selectedWallet === null || selectedWallet === undefined ) router.push('./selectwallet'); // re-directs user if there is no selected wallet //
        const [
            fetchedBalances,
            fetchedPrices
        ] = await Promise.all([fetchBalance(selectedWallet), fetchPrices()])
        if(!isMounted) return;
        setWalletBalances(fetchedBalances)
        setPrices(fetchedPrices)
        setIsLoading(false)
    },[ selectedWallet, router ]);

    useEffect( _ => {
        if ( !initialized ) return;
        init();
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

    const setSelectedWalletFn = ( walletAddress ) => {
        setSelectedWallet( walletAddress );
        setInitialized(true);
    }

    const value = { // returned values from provider //
        walletBalances,
        isLoading,
        setSelectedWallet: setSelectedWalletFn,
        initialized,
        prices
    };

    return (
        <BalanceContext.Provider value={ value } > { children } </BalanceContext.Provider>
    )
}

export default BalanceProvider;