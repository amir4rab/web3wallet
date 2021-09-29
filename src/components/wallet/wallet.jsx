import { useContext, useState, useEffect } from 'react';
import { BalanceContext } from '../../providers/balanceProvider/balanceProvider';

import calculateWalletDetails from '../../utils/frontend/calculateWalletDetails/calculateWalletDetails';

import TotalCard from './totalCard/totalCard';
import classes from './wallet.module.scss';
import CryptoRow from './cryptoRow/cryptoRow';

function WalletComponent() {
    const {  isLoading, prices, walletBalances } = useContext(BalanceContext);
    
    const [ total, setTotal ] = useState();
    const [ percentagesArr, setPercentagesArr ] = useState([]);
    const [ cryptosArr, setCryptosArr ] = useState([]);
    const [ initialized, setInitialized ] = useState(false);
    

    useEffect( _ => {
        if ( isLoading ) return;

        const {
            total,
            percentagesArr,
            cryptosArr,
        } = calculateWalletDetails( walletBalances, prices );

        const sortedDataArr = cryptosArr.sort((a , b) => {
            if(a.price < b.price) return 1;
            if(a.price > b.price) return -1;
            return 0;
        });

        setTotal(total)
        setPercentagesArr(percentagesArr)
        setCryptosArr(sortedDataArr)
        setInitialized(true);
    }, [ isLoading, walletBalances, prices ]);


    if( !initialized ) {
        return (
            <div className={ classes.wallet }>
                <TotalCard skeleton />
                <div className={ classes.cardsHolder }>
                    {
                        cryptosArr.map(data => <CryptoRow data={ data } key={ data.id } />)
                    }
                </div>
        </div>
        )
    }


    return (
        <div className={ classes.wallet }>
            <TotalCard total={total} percentagesArr={percentagesArr} />
            <div className={ classes.cardsHolder }>
                {
                    cryptosArr.map(data => <CryptoRow data={ data } key={ data.id } />)
                }
            </div>
        </div>
    );
};

export default WalletComponent;
