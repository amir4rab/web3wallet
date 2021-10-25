import { getCryptosIds } from "../../../src/utils/global/cryptosData/cryptoData";
import GetPricesForApi from "../../../src/utils/backend/getPricesFromApi";
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

const getPricesFromApi = new GetPricesForApi(getCryptosIds(),'usd,eur,gbp,chf,dkk');

export default async function handler(req, res) {
    await runMiddleware(req, res, speedLimiter);
    const response = await getPricesFromApi.getCurrentPrice();

    res.status(200).json({ ...response });
}  