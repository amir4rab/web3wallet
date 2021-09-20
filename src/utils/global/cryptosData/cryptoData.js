import data from './data.json';

export const getCryptosDataArr = () => data.arr;
//* after updates to cryptoDataArr, following functions needs to be runned, to generate cashed data for following functions *//
export const getCryptosDataObj = () => data.obj;
export const getCryptosIds = () => data.ids;
export const getCryptosIdToSymbol = () => data.idToSymbol;
;
export const generateCryptosIdToSymbol = () => {
    const res = {};
    data.arr.forEach(item => {
        res[item.id] =  item.symbol
    })
    return res;
}
export const generateCryptosDataObj = () => {
    const res = {};
    data.arr.forEach(item => {
        res[item.id] = {
            'symbol': item.symbol,
            'name': item.name,
            'color': item.color,
        }
    })
    return res;
}
export const generateCryptosIds = () => {
    let res = '';
    data.arr.forEach((item, i) => {
        i === 0 ? res = res + `${item.id}` : res = res + `,${item.id}`;
    })
    return res;
}
