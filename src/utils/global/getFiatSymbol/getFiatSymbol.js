export const getFiatSymbol = (currency) => {
    switch(currency){
        case 'eur': return '€'
        case 'gbp': return '£'
        case 'usd': return '$'
        case 'dkk': return 'kr'
        case 'czk': return 'Kč'
        case 'eur': return '£'
        case 'sek': return 'kr'
        case 'chf': return 'CHF'
    }
}

export default getFiatSymbol;