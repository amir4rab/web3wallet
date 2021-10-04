export const shortenStringFloat = ( stringFloat, index=2 ) => {
    if( !stringFloat.includes('.') ) return stringFloat;
    const floatArr = stringFloat.split('.');
    return floatArr[0] + '.' + floatArr[1].slice(0,index);
}

export default shortenStringFloat;