const shortenAddress = ( address, maxLength = 20 ) => {
    return `${address.slice(0, maxLength / 2)}...${address.slice(maxLength / -2)}`
};

export default shortenAddress;