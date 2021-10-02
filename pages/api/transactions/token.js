import getTransactions from "../../../src/utils/backend/getTransactions";

export default async function handler(req, res) {
    const {
        wallet,
        network
    } = req.query;
    if( wallet === undefined || network === undefined ) res.status(400).json({ err: 'wrong inputs!' });

    const response = await getTransactions(wallet, network, 'token');

    res.status(200).json({ ...response });
}  