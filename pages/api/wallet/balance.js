import getNetworkForApi from "../../../src/utils/backend/getNetworkForApi";
import getBalanceFromApi from "../../../src/utils/backend/getBalanceFromApi";
const slowDown = require("express-slow-down");

const speedLimiter = slowDown({
    windowMs: 60 * 1000, // 1 minute
    delayAfter: 1, // allow 1 requests per 15 minutes, then...
    delayMs: 1000 // begin adding 1s of delay per request above 1:
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export default async function handler(req, res) {
    await runMiddleware(req, res, speedLimiter);
    const {
        wallet,
        network
    } = req.query;
    if( wallet === undefined || network === undefined ) res.status(400).json({ err: 'wrong inputs!' });
    
    const networkName = getNetworkForApi(network);
    const response = await getBalanceFromApi(networkName, wallet);
    
    res.status(200).json({ ...response });
} 