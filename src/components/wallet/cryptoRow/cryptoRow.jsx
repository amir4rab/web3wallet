import React from 'react';
import Img from 'next/image';
import { useRouter } from 'next/router';

import classes from './cryptoRow.module.scss';

import getCryptoImg from '../../../utils/frontend/cryptoImg/getCryptoImg';

function CryptoRow({ data }) {
    const router = useRouter();
    return (
        <div onClick={ _ => router.push(`/wallet/transaction/${data.id}`) } className={ classes.cryptoRow } >
            <div className={ classes.imgPart }>
                <div 
                    className={ classes.imgHolder }
                    style={{ boxShadow: `0 0 1rem 0 ${data.color}` }}
                >
                    <div className={ classes.imageWrapper } >
                        <Img src={ getCryptoImg(data.symbol) } objectFit='contain'/>
                    </div>
                </div>
            </div>
            <div className={ classes.details }>
                <div className={ classes.leftColumn }>
                    <div className={ classes.main }>
                        { data.name }
                    </div>
                    <div className={ classes.sub }>
                        { parseFloat(data.balance).toFixed(4) } { data.symbol }
                    </div>
                </div>
                <div className={ classes.rightColumn }>
                    <div className={ classes.main }>
                        { data.price } €
                    </div>
                    <div className={ classes.sub }>
                        {
                            parseFloat(data.changes) > 0 ? 
                            <p className={ classes.increased }>{ parseFloat(data.changes).toFixed(2) } %</p> : 
                            <p className={ classes.decreased }>{ parseFloat(data.changes).toFixed(2) } %</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoRow;
