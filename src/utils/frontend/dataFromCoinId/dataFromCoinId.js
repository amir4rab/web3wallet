import getCryptoImg from '../cryptoImg/getCryptoImg';
import { weiToEth } from '../../global/convertor/convertor';

const nameBySymbol = (symbol) => {
    switch(symbol){
        case 'eth': return 'Ethereum';
        case 'matic': return 'Polygon';
        case 'trx': return 'Tron';
    }
}

const tokenTypeBySymbol = (network) => {
    switch(network){
        case 'eth': return 'erc20';
        case 'matic': return 'polygon';
        case 'trx': return 'trc20';
    }
}

const dataFromCoinId = (coinId, balances, prices) => {
    if( !coinId.includes('-') ) { // native coin
        const symbol = coinId;
        return ({
            type: 'native',
            name: nameBySymbol(symbol),
            symbol: symbol,
            price: prices[symbol].eur,
            changes: prices[symbol].eur_24h_change,
            value: parseFloat(((parseFloat(weiToEth(balances[symbol].native.balance, 18)))* prices[symbol].eur).toFixed(2)),
            balance: balances[symbol].native.balance,
            decimals: 18,
            image: getCryptoImg(symbol),
            network: symbol,
            tokenType: null,
            tokenAddress: null,
            nativeCoinBalance: null,
            nativeCoinPrice: null,
        });
    } else { // token
        const [ network, symbol ] = coinId.split('-');

        const tokenData = balances[network].token.find(item => item.symbol.toLowerCase() === symbol);

        if( tokenData === null ) {
            console.log('not fined');
        }

        const {
            balance,
            decimals,
            name,
            token_address
        } = tokenData;

        return ({
            type: 'token',
            name,
            symbol,
            price: prices[symbol].eur,
            changes: prices[symbol].eur_24h_change,
            value: parseFloat(((parseFloat(weiToEth(balance, decimals)))* prices[symbol].eur).toFixed(2)),
            balance,
            decimals,
            image: getCryptoImg(symbol),
            network,
            tokenType: tokenTypeBySymbol(network),
            tokenAddress: token_address,
            nativeCoinBalance: balances[network].native.balance,
            nativeCoinPrice: prices[network].eur,
        });
    }
}

export default dataFromCoinId;