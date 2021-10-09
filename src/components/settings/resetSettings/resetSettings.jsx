import Link from 'next/link';

import classes from './resetSettings.module.scss';

function ResetSettings() {
    return (
        <div className={ classes.resetSettings }>
            <h3 className={ classes.subtitle }>
                Reset
            </h3>
            <p>
                Before resetting your wallet Store your 12 key phrases in a secure location.
            </p>
            <p>
                Click <Link href='/reset'>here</Link> to go to reset page.
            </p>
        </div>
    );
};

export default ResetSettings;
