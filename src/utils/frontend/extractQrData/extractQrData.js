const getNetworkName = (network) => {
    switch(network) {
        case 'eth' : return('ethereum');
        case 'matic': return('polygon');
        default: return('ethereum');
    }
}

export const extractQrData = (data, network) => {
    const networkName = getNetworkName(network)
    if( data.length === 42 ) {
        return {
            status: 'successful',
            address: data
        }
    }
    if ( data.includes(networkName.toLowerCase()) ) {
        const searchParam = `${networkName.toLowerCase()}:`;
        const startingIndex = data.indexOf(searchParam) + searchParam.length;
        return {
            status: 'successful',
            data: data.slice(startingIndex, startingIndex + 42)
        }
    }
    return ({
        status: 'failed',
        data: null
    })
};

export default extractQrData;