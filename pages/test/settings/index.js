import { useContext, useRef } from 'react';
import { SettingsContext } from '../../../src/providers/settingsProvider/settingsprovider';

function SettingsTestPage() {
    const { settingsArr, changeSetting } = useContext(SettingsContext);
    const valueRef = useRef();
    const idRef = useRef();
    const addSetting = async () => {
        const obj = { value: valueRef.current.value, id: idRef.current.value };
        await changeSetting(obj);
    };

    return (
        <div>
            <div>
                <input ref={ valueRef } placeholder='setting name' />
                <br />
                <input ref={ idRef } placeholder='setting id' />
                <button onClick={ addSetting }>
                    Add
                </button>
            </div>
            <div>
                {
                    settingsArr.map(item => <p key={item.id}>{item.id}:{item.value}</p>)
                }
            </div>
        </div>
    );
};

export default SettingsTestPage;
