export const pathFinder = ( isNew, isLoggedIn ) => {
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
};

export default pathFinder;