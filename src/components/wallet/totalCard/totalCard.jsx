import classes from './totalCard.module.scss';

function TotalCard({ total, percentagesArr, skeleton }) {

    if( skeleton ) return (
        <div className={ classes.totalCardSkeleton }></div>
    );

    return (
        <div className={ classes.totalCard }>
            <p className={ classes.infoText } >Total balance</p>
            <div className={ classes.title }>
                <h3 className= { classes.number }>
                    { total }
                </h3>
                <p className={ classes.curr }>€</p>
            </div>
            <div className={ classes.bottomLine }>
                { 
                    percentagesArr.map(item => 
                        <div 
                            key={item.color} 
                            style={
                                { 
                                    width: item.width, 
                                    background: item.color, 
                                    boxShadow: `0 0 1.25rem 0 ${item.color}` 
                                }
                            } 
                            className={ classes.item }
                        />
                    )
                }
            </div>
        </div>
    )
}

export default TotalCard
