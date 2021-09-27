// import from '../../../../public/assets/logos/.png';

import xbtc from '../../../../public/assets/logos/0xbtc.png';
import aave from '../../../../public/assets/logos/aave.png';
import ada from '../../../../public/assets/logos/ada.png';
import algo from '../../../../public/assets/logos/algo.png';
// import amAAve from '../../../../public/assets/logos/amAAve.png';
import amdai from '../../../../public/assets/logos/amDAI.png';
import amp from '../../../../public/assets/logos/amp.png';
import btcb from '../../../../public/assets/logos/btcb.png';
import fil from '../../../../public/assets/logos/fil.png';
import madai from '../../../../public/assets/logos/madai.png';
import mayfi from '../../../../public/assets/logos/mayfi.png';
import wbtc from '../../../../public/assets/logos/wbtc.png';
import amusdc from '../../../../public/assets/logos/amusdc.png';
import dai from '../../../../public/assets/logos/dai.png';
import iotx from '../../../../public/assets/logos/iotx.png';
import matic from '../../../../public/assets/logos/matic.png';
import sol from '../../../../public/assets/logos/sol.png';
import xaut from '../../../../public/assets/logos/xaut.png';
import amusdt from '../../../../public/assets/logos/amUSDT.png';
import doge from '../../../../public/assets/logos/doge.png';
import link from '../../../../public/assets/logos/link.png';
import mauni from '../../../../public/assets/logos/mauni.png';
import sushi from '../../../../public/assets/logos/sushi.png';
import xrp from '../../../../public/assets/logos/xrp.png';
import amwmatic from '../../../../public/assets/logos/amWMATIC.png';
import dot from '../../../../public/assets/logos/dot.png';
import ltc from '../../../../public/assets/logos/ltc.png';
import mausdc from '../../../../public/assets/logos/mausdc.png';
import uni from '../../../../public/assets/logos/uni.png';
import avax from '../../../../public/assets/logos/avax.png';
import eos from '../../../../public/assets/logos/eos.png';
import luna from '../../../../public/assets/logos/luna.png';
import mausdt from '../../../../public/assets/logos/mausdt.png';
import usdc from '../../../../public/assets/logos/usdc.png';
import bnb from '../../../../public/assets/logos/bnb.png';
import eth from '../../../../public/assets/logos/eth.png';
import maaave from '../../../../public/assets/logos/maaave.png';
import maweth from '../../../../public/assets/logos/maweth.png';
import usdt from '../../../../public/assets/logos/usdt.png';




const getCryptoImg = (input) => {
    switch(input){ 
        case'0xbtc':{ return xbtc } 
        case 'amp':{ return amp } 
        case 'btcb':{ return btcb } 
        case 'fil':{ return fil } 
        case 'madai':{ return madai } 
        case 'mayfi':{ return mayfi } 
        case 'wbtc':{ return wbtc } 
        case 'aave':{ return aave } 
        case 'amusdc':{ return amusdc } 
        case 'dai':{ return dai } 
        case 'iotx':{ return iotx } 
        case 'matic':{ return matic } 
        case 'sol':{ return sol } 
        case 'xaut':{ return xaut } 
        case 'ada':{ return ada } 
        case 'amusdt':{ return amusdt } 
        case 'doge':{ return doge } 
        case 'link':{ return link } 
        case 'mauni':{ return mauni } 
        case 'sushi':{ return sushi } 
        case 'xrp':{ return xrp } 
        case 'algo':{ return algo } 
        case 'amwmatic':{ return amwmatic } 
        case 'dot':{ return dot } 
        case 'ltc':{ return ltc } 
        case 'mausdc':{ return mausdc } 
        case 'uni':{ return uni } 
        // case 'amaave':{ return amAAve } 
        case 'avax':{ return avax } 
        case 'eos':{ return eos } 
        case 'luna':{ return luna } 
        case 'mausdt':{ return mausdt } 
        case 'usdc':{ return usdc } 
        case 'amdai':{ return amdai } 
        case 'bnb':{ return bnb } 
        case 'eth':{ return eth } 
        case 'maaave':{ return maaave } 
        case 'maweth':{ return maweth } 
        case 'usdt':{ return usdt } 
        default: { return eth } 
    }
};

export default getCryptoImg;