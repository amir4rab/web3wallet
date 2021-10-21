import classes from './dex.module.scss';

function Dex() {
    return (
        <div className={ classes.dex }>
            <h1 className={ classes.title }>
                Dex
            </h1>
            <div className={ classes.text }>
                {`This feature isn't ready yet`} 
            </div>
        </div>
    )
}

export default Dex
