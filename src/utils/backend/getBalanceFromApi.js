const getBalanceFromApi = async (networkName, wallet) => {
    const nativeTokenUrl = `https://deep-index.moralis.io/api/v2/${wallet}/balance?chain=${networkName}`;
    const tokensUrl = `https://deep-index.moralis.io/api/v2/${wallet}/erc20?chain=${networkName}`;
    const fetchSettings = { headers: { 'X-API-Key': process.env.moralisApiKey } };
    const response = await Promise.all([
        fetch(nativeTokenUrl,fetchSettings),
        fetch(tokensUrl,fetchSettings)
    ])
    const json = await Promise.all([
        response[0].json(),
        response[1].json()
    ])
    return ({
        'native': json[0],
        'token': json[1]
    });
}

export default getBalanceFromApi;