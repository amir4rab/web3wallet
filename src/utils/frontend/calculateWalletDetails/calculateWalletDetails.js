import { weiToEth } from '../../global/convertor/convertor';
import { colorBySymbol } from '../../global/cryptosData/cryptoData';

const getNameByNetwork = (network) => {
    switch(network){
        case 'matic': {
            return 'Polygon'
        }
        case 'eth':{
            return 'Ethereum'
        }
    }
}

const calculateWalletDetails = (balances, prices) => {
    const balancesKeys = Object.keys(balances);
    let total = 0; // gets returned from the function
    const percentagesArr = []; // gets returned from the function
    const cryptosArr = [];
    
    const valuesPerItem = {}; // holds prices per symbol

    balancesKeys.forEach(network => {
        const balanceObj = balances[network];

        const nativePrices = parseFloat(((weiToEth(balanceObj.native.balance, 18)) * prices[network].eur).toFixed(2));
        total = total + nativePrices;

        cryptosArr.push({
            symbol: network,
            balance: weiToEth(balanceObj.native.balance, 18),
            price: nativePrices,
            name: getNameByNetwork(network),
            changes: prices[network].eur_24h_change,
            id: network,
            type: 'coin',
            color: colorBySymbol[network]
        })

        if(nativePrices > 0) {
            if ( valuesPerItem.network === undefined ) {
                valuesPerItem[network] = nativePrices;
            } else {
                valuesPerItem[network] = valuesPerItem[network] + nativePrices;
            }
        }

        balanceObj.token.forEach( token => {
            const tokenPrice = parseFloat(((weiToEth(token.balance, token.decimals)) * prices[token.symbol.toLowerCase()].eur).toFixed(2));
            total = total + tokenPrice;
            if(tokenPrice > 0) {
                if ( valuesPerItem.network === undefined ) {
                    valuesPerItem[token.symbol.toLowerCase()] = tokenPrice;
                } else {
                    valuesPerItem[token.symbol.toLowerCase()] = valuesPerItem[token.symbol.toLowerCase()] + tokenPrice;
                }
            }
            cryptosArr.push({
                symbol: token.symbol.toLowerCase(),
                balance: weiToEth(token.balance, token.decimals),
                price: tokenPrice,
                name: token.name,
                changes: prices[token.symbol.toLowerCase()].eur_24h_change,
                id: `${network}-${token.symbol.toLowerCase()}`,
                type: `${getNameByNetwork(network)} token`,
                color: colorBySymbol[token.symbol.toLowerCase()],
            })
        })
    });

    (() => {
        const keys = Object.keys(valuesPerItem);
        keys.forEach(key => {
            percentagesArr.push({
                width: `${parseFloat(((valuesPerItem[key] * 100) / total).toFixed(2))}%`,
                color: colorBySymbol[key]
            });
        })
    })();
    
    return {
        total: total.toFixed(2),
        percentagesArr,
        cryptosArr
    };
};

export default calculateWalletDetails;