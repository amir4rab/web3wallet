import React from 'react';
import classes from './loadingIndicator.module.scss';

function LoadingIndicator({ display = false }) {
    return (
        <div 
            className={[ 
                classes.loadingIndicator, 
                display ? classes.display : classes.hide 
            ].join(' ')}
        >
            <div className={ classes.loading } />
        </div>
    );
};

export default LoadingIndicator;
