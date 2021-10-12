import { useContext, useEffect } from 'react';
import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import { useRouter } from 'next/router';
import Loading from '../loading/loading';

import { pathFinder } from '../../utils/frontend/pathFinder/pathFinder';

function HomeComponent() {
    const { isNew, isLoggedIn } =  useContext(WalletsContext);
    const router = useRouter();

    useEffect( _ => {
        router.push(pathFinder(isNew, isLoggedIn))
    }, [ router, isNew, isLoggedIn ]);

    return (
        <div
            style={{
                minHeight: '95vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <Loading />
        </div>
    );
};

export default HomeComponent;
