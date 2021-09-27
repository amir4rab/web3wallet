const arr = [
    "0xbtc",
    "amp",
    "btcb",
    "fil",
    "madai",
    "mayfi",
    "wbtc",
    "aave",
    "amusdc",
    "dai",
    "iotx",
    "matic",
    "sol",
    "xaut",
    "ada",
    "amUSDT",
    "doge",
    "link",
    "mauni",
    "sushi",
    "xrp",
    "algo",
    "amWMATIC",
    "dot",
    "ltc",
    "mausdc",
    "uni",
    "amAAVE",
    "avax",
    "eos",
    "luna",
    "mausdt",
    "usdc",
    "amDAI",
    "bnb",
    "eth",
    "maaave",
    "maweth",
    "usdt",
];

const makeSwitch = () => {
    let response = 'switch(input){ \n';

    arr.forEach(item => {
        response = response + `case '${item.toLowerCase()}':{ return ${item.toLowerCase()} } \n`;
    })

    response = response + `default: { return eth } \n }`;

    console.log(response);
}

makeSwitch(); //* makes a switch statement and logs it to the console *//