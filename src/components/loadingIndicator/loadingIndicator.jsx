import { memo } from 'react';

import classes from './loadingIndicator.module.scss';

const LoadingIndicator = ({ display = false }) =>  (
    <div 
        className={ display ? classes.loadingIndicatorDisplay : classes.loadingIndicatorHide }
    >
        <div className={ classes.loading } />
    </div>
);

export default memo(LoadingIndicator, ( pervProps, nextProps ) => {
    return !(pervProps.display !== nextProps.display)
});
