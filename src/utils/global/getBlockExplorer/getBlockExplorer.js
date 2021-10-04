export const getBlockExplorer = ( network, type ) => {
    const state = `${network}-${type}`;
    switch(state){
        case 'eth-main':{
            return 'https://etherscan.io'
        }
        case 'eth-test':{
            return 'https://rinkeby.etherscan.io'
        }
        case 'polygon-main':{
            return 'https://polygonscan.com';
        }
        case 'polygon-test':{ 
            return 'https://mumbai.polygonscan.com'
        }
    }
}

export default getBlockExplorer;