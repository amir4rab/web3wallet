import { useContext, useEffect } from 'react';
import { WalletsContext } from '../../providers/walletsProvider/walletsProvider';
import { useRouter } from 'next/router';
import Loading from '../loading/loading';

const findDestination = (isNew, isLoggedIn) => {
    const state = `${isNew}-${isLoggedIn}`;
    switch(state){
        case 'true-false':{
            return '/welcome';
        }
        case 'true-true':{
            return '/welcome'
        }
        case 'false-false':{
            return '/login'
        }
        case 'false-true':{
            return '/selectwallet'
        }
    }
}

function HomeComponent() {
    const { isNew, isLoggedIn } =  useContext(WalletsContext);
    const router = useRouter();

    useEffect( _ => {
        console.log(isNew, isLoggedIn)
        router.push(findDestination(isNew, isLoggedIn))
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
