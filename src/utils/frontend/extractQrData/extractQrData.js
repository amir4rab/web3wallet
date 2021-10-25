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
        console.log('first if')
        return {
            status: 'successful',
            address: data
        }
    }
    if ( data.includes(networkName.toLowerCase()) ) {
        const searchParam = `${networkName.toLowerCase()}:`;
        const startingIndex = data.indexOf(searchParam) + searchParam.length;
        console.log('second if')
        return {
            status: 'successful',
            address: data.slice(startingIndex, startingIndex + 42)
        }
    }
    return ({
        status: 'failed',
        address: null
    })
};

export default extractQrData;