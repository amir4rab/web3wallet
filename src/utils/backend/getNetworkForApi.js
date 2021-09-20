const getNetworkForApi = (network) => {
    let res;
    switch( network ) {
        case 'eth':{
            res = 'eth';
            break;
        }
        case 'eth-rinkeby':{
            res = 'rinkeby';
            break;
        }
        // case 'bsc':{
        //     res = 'bsc';
        //     break;
        // }
        // case 'bsc-testnet':{
        //     res = 'bsc%20testnet';
        //     break;
        // }
        case 'polygon':{
            res = 'polygon';
            break;
        }
        case 'polygon-mumbai':{
            res = 'mumbai';
            break;
        }
        default:{
            res = 'eth';
            break;
        }
    }
    return res;
};

export default getNetworkForApi;