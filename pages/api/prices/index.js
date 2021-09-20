import { getCryptosIds } from "../../../src/utils/global/cryptosData/cryptoData";
import GetPricesForApi from "../../../src/utils/backend/getPricesFromApi";

const getPricesFromApi = new GetPricesForApi(getCryptosIds(),'usd');

export default async function handler(req, res) {
    const response = await getPricesFromApi.getCurrentPrice();

    res.status(200).json({ ...response });
}  