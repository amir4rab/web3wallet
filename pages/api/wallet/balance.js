import getNetworkForApi from "../../../src/utils/backend/getNetworkForApi";
import getBalanceFromApi from "../../../src/utils/backend/getBalanceFromApi";


export default async function handler(req, res) {
    const {
        wallet,
        network
    } = req.query;
    if( wallet === undefined || network === undefined ) res.status(400).json({ err: 'wrong inputs!' });
    
    const networkName = getNetworkForApi(network);
    const response = await getBalanceFromApi(networkName, wallet);
    
    res.status(200).json({ ...response });
} 