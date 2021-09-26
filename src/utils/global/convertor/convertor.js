import BigNumber from 'bignumber.js';

export const weiToEth = (value, decimal) => {
    const res = new BigNumber(value / ( 10 ** decimal ));
    return res.toString();
}