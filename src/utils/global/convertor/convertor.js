import BigNumber from 'bignumber.js';

export const weiToEth = (value, decimals) => {
    const res = new BigNumber(value).dividedBy(( 10 ** decimals ));
    return res.toString(10);
}

export const ethToWei = ( value, decimals ) => {
    const res = new BigNumber(value).multipliedBy(( 10 ** decimals ));
    return res.toString(10);
}
