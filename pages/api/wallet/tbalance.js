import getBalanceFromApi from "../../../src/utils/backend/getBalanceFromApi";

export default async function handler(req, res) {
    const {
        wallet,
        network
    } = req.query;
    if( wallet === undefined || network === undefined ) res.status(400).json({ err: 'wrong inputs!' });
    let response;
    if (network === "main") {
        response = await Promise.all([
            getBalanceFromApi('eth', wallet),
            getBalanceFromApi('polygon', wallet),
        ]) 
    } else {
        response = await Promise.all([
            getBalanceFromApi('rinkeby', wallet),
            getBalanceFromApi('mumbai', wallet),
        ])
    };
    
    res.status(200).json({ 
        eth: response[0],
        polygon: response[1]
    });
} 