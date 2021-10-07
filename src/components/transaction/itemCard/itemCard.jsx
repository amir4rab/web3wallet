import { weiToEth } from '../../../utils/global/convertor/convertor';
import { shortenStringFloat } from '../../../utils/global/shortenStringFloat/shortenStringFloat';

import classes from './itemCard.module.scss'

function ItemCard({ data }) {
    return (
        <div className={ classes.itemCard }>
            {
                data.type === 'coin' ?
                <p className={ classes.infoText } >coin</p> : null
            }
            {
                data.type === 'token' ?
                <p className={ classes.infoText } >{ data.tokenType }</p> : null
            }
            {
                data.type === 'token' ?
                <p className={ classes.secondInfoText } >{ data.network }</p> : null
            }
            <div className={ classes.title }>
                <h2 className={ classes.number }>
                    { shortenStringFloat(weiToEth(data.balance, data.decimals), 6) }
                </h2>                
                <p className={ classes.symbol }>
                    { data.symbol }
                </p>
            </div>
            <div className={ classes.subtitle }>
                <h3 className= { classes.number }>
                    { data.value }
                </h3>
                <p className={ classes.curr }>{ data.fiatSymbol }</p>
            </div>
        </div>
    )
}

export default ItemCard;
