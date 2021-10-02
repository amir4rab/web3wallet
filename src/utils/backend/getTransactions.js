const getTransactions = async ( wallet, network, type ) => {
    let api;

    if ( type === 'token' ) {
        api = `https://deep-index.moralis.io/api/v2/${wallet}/erc20/transfers?chain=${network}`;
    } else {
        api = `https://deep-index.moralis.io/api/v2/${wallet}?chain=${network}`;
    };

    console.log(api)

    const fetchSettings = { headers: { 'X-API-Key': process.env.moralisApiKey } };

    const res = await fetch(api, fetchSettings);

    const json = await res.json();

    return json;
};

export default getTransactions;