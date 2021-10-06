import { useContext } from 'react';

import { SettingsContext } from '../../../providers/settingsProvider/settingsprovider';
import { WalletsContext } from '../../../providers/walletsProvider/walletsProvider';
import Loading from '../loading';

function InitialLoading({children}) {
    const { isInitialized: isSettingsInitialized } = useContext(SettingsContext);
    const { isLoading: areWalletsLoading } = useContext(WalletsContext);

    console.log(`isSettingsInitialized: ${isSettingsInitialized}, areWalletsLoading: ${areWalletsLoading}, ${!isSettingsInitialized && areWalletsLoading}`);

    return (
        <>
            {
                !isSettingsInitialized && areWalletsLoading ? 
                <div
                    style={{
                        minHeight: '95vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <Loading />
                    <h3 
                        style={{
                            fontWeight: 400,
                            paddingTop: '2rem'
                        }}
                    >
                        Loading...
                    </h3>
                </div> 
                : 
                children
            }
        </>
    )
}

export default InitialLoading
