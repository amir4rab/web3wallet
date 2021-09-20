import { getCryptosIdToSymbol } from "../global/cryptosData/cryptoData";

const mapPricesToSymbols = (dataObj) => {
    const obj = getCryptosIdToSymbol();
    const responseObj = {};
    const keys = Object.keys(dataObj);
    keys.forEach(key => {
        responseObj[obj[key]] = dataObj[key];
    })
    return responseObj;
}

class GetPricesForApi {
    constructor (coins,currencies) {
        this.api = `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${currencies}&include_24hr_change=true&include_last_updated_at=true`;
        this.updating = false;
        this.lastPromise = null;
        this.latestUpdate = null;
    }

    getCurrentPrice(){
        const currData = new Date;
        
        if( this.updating ) return this.lastPromise; // returns current response after fetching. 
        
        if ( this.latestUpdate !== null ) if ( currData.valueOf() - this.latestUpdate < 60000 ) return this.lastPromise; // checks if the response is expired, otherwise, returns the old data.
        
        this.lastPromise = new Promise(async (response, reject) => { // fetches new data from api
            this.updating = true;
            try {
                const res = await fetch(this.api);
                const json = await res.json();
                this.latestUpdate = currData.valueOf();
                this.updating = false;
                const responseObj = mapPricesToSymbols(json)
                response(responseObj);
            } catch {
                this.updating = false;
                reject('something went wrong!');
            }
        });

        return this.lastPromise;
    }
}

export default GetPricesForApi;