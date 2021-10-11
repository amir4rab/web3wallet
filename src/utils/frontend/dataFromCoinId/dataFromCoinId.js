import getCryptoImg from '../cryptoImg/getCryptoImg';
import { weiToEth } from '../../global/convertor/convertor';
import { getFiatSymbol } from '../../global/getFiatSymbol/getFiatSymbol'

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

const cashedCoinData = (coinId) => {
    switch(coinId){
        case 'eth-dai': return ({
            tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
            name: 'Dai',
            decimals: 18,
        });
        case 'eth-usdc': return ({
            tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            name: 'USD Coin',
            decimals: 6,
        });
        case 'eth-wbtc': return ({
            tokenAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            name: 'Wrapped Bitcoin',
            decimals: 6,
        });
        case 'matic-dai': return ({
            tokenAddress: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
            name: 'Dai',
            decimals: 18,
        });
        case 'matic-usdc': return ({
            tokenAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
            name: 'USD Coin',
            decimals: 6,
        });
        case 'matic-wbtc': return ({
            tokenAddress: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
            name: 'Wrapped Bitcoin',
            decimals: 6,
        });
        default: return ({
            tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
            name: 'Dai',
            decimals: 18,
        })
    }
}

export const dataFromCoinId = (coinId, balances, prices, currency) => {
    const fiatSymbol = getFiatSymbol(currency);
    if( !coinId.includes('-') ) { // native coin
        const symbol = coinId;
        return ({
            type: 'native',
            name: nameBySymbol(symbol),
            symbol: symbol,
            price: prices[symbol][currency],
            changes: prices[symbol][`${currency}_24h_change`],
            value: parseFloat(((parseFloat(weiToEth(balances[symbol].native.balance, 18)))* prices[symbol][currency]).toFixed(2)),
            balance: balances[symbol].native.balance,
            decimals: 18,
            image: getCryptoImg(symbol),
            network: symbol,
            tokenType: null,
            tokenAddress: null,
            nativeCoinBalance: null,
            nativeCoinPrice: null,
            fiatSymbol,
        });
    } else { // token
        const [ network, symbol ] = coinId.split('-');

        const tokenData = balances[network].token.find(item => item.symbol.toLowerCase() === symbol);

        if( tokenData === undefined ) {
            const {
                decimals,
                name,
                tokenAddress,
            } = cashedCoinData(coinId);

            return ({
                type: 'token',
                name,
                symbol,
                price: prices[symbol][currency],
                changes: prices[symbol][`${currency}_24h_change`],
                value: 0,
                balance: 0,
                decimals,
                image: getCryptoImg(symbol),
                network,
                tokenType: tokenTypeBySymbol(network),
                tokenAddress,
                nativeCoinBalance: balances[network].native.balance,
                nativeCoinPrice: prices[network][currency],
                fiatSymbol,
            })
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
            price: prices[symbol][currency],
            changes: prices[symbol][`${currency}_24h_change`],
            value: parseFloat(((parseFloat(weiToEth(balance, decimals)))* prices[symbol][currency]).toFixed(2)),
            balance,
            decimals,
            image: getCryptoImg(symbol),
            network,
            tokenType: tokenTypeBySymbol(network),
            tokenAddress: token_address,
            nativeCoinBalance: balances[network].native.balance,
            nativeCoinPrice: prices[network][currency],
            fiatSymbol,
        });
    }
}

export default dataFromCoinId;