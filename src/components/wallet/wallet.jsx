import { useContext, useState, useEffect } from 'react';
import { BalanceContext } from '../../providers/balanceProvider/balanceProvider';
import { SettingsContext } from '../../providers/settingsProvider/settingsprovider';

import calculateWalletDetails from '../../utils/frontend/calculateWalletDetails/calculateWalletDetails';

import TotalCard from './totalCard/totalCard';
import classes from './wallet.module.scss';
import CryptoRow from './cryptoRow/cryptoRow';

function WalletComponent() {
    const { isLoading, prices, walletBalances } = useContext(BalanceContext);
    const { settingsObj } = useContext(SettingsContext);

    const [ total, setTotal ] = useState();
    const [ percentagesArr, setPercentagesArr ] = useState([]);
    const [ cryptosArr, setCryptosArr ] = useState([]);
    const [ initialized, setInitialized ] = useState(false);
    const [ fiatSymbol, setFiatSymbol ] = useState(null);
    

    useEffect( _ => {
        if ( isLoading ) return;

        const {
            total,
            percentagesArr,
            cryptosArr,
            fiatSymbol
        } = calculateWalletDetails( walletBalances, prices, settingsObj.currency );

        const sortedDataArr = cryptosArr.sort((a , b) => {
            if(a.price < b.price) return 1;
            if(a.price > b.price) return -1;
            return 0;
        });

        setFiatSymbol(fiatSymbol);
        setTotal(total)
        setPercentagesArr(percentagesArr)
        setCryptosArr(sortedDataArr)
        setInitialized(true);
    }, [ isLoading, walletBalances, prices, settingsObj ]);


    if( !initialized ) {
        return (
            <div className={ classes.wallet }>
                <TotalCard skeleton />
        </div>
        )
    }


    return (
        <div className={ classes.wallet }>
            <TotalCard fiatSymbol={ fiatSymbol } total={total} percentagesArr={percentagesArr} />
            <div className={ classes.cardsHolder }>
                {
                    cryptosArr.map(data => <CryptoRow fiatSymbol={ fiatSymbol } currency={ settingsObj.currency } data={ data } key={ data.id } />)
                }
            </div>
        </div>
    );
};

export default WalletComponent;
