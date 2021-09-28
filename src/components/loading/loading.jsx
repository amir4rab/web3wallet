import classes from './loading.module.scss';

function Loading() {
    return (
        <div className={ classes.loading }>
            <div className={ classes.innerCircle1 }>
                <div className={ classes.innerCircle2 }> 
                    <div className={ classes.innerCircle3 } />
                </div>
            </div>
        </div>
    );
};

export default Loading;
