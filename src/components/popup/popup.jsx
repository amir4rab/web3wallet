import classes from './popup.module.scss';

function Popup({ isActive, setIsActive, title, children }) {
    return (
        <div className={ isActive ? classes.showPopup : classes.hidePopup }>
            <div className={ classes.header }>
                <h3 className={ classes.title }> 
                    {
                        title
                    }
                </h3>
                <button className={ classes.closeBtn } onClick={ _ => setIsActive(false) }>
                    Close
                </button>
            </div>
            <div className={ classes.content }>
                {
                    children
                }
            </div>
        </div>
    );
};

export default Popup;
