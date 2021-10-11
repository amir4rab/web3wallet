import { useState, useEffect } from 'react';
import Img from 'next/image';

import getCryptoImg from '../../utils/frontend/cryptoImg/getCryptoImg';

import classes from './select.module.scss';

function Select({ valuesArr, selectedValue, setSelectedValue, includeImg }) {
    const [isFocused, setIsFocused] = useState(false);
    const [optionsClass, setOptionsClass] = useState(classes.hiddenOptions);
    const [optionsVisible, setOptionsVisible] = useState(true);

    useEffect( _ => {
            let timeout;
            isFocused
                ? setOptionsClass(classes.visibleOptions)
                : setOptionsClass(classes.hiddenOptions);
            if (!isFocused) {
                timeout = setTimeout((_) => {
                setOptionsVisible(false);
                }, 300);
            } else {
                setOptionsVisible(true);
            }
            return () => {
                clearTimeout(timeout);
            };
    },[isFocused]);

    return (
        <div className={ classes.selectWrapper }>
            <button
                className={ classes.selector }
                readOnly
                type="text"
                onFocus={ _ => setIsFocused(true)}
                onBlur={ _ => setIsFocused(false)}
            >
                {
                    includeImg ? 
                    <div className={ classes.imgWrapper }>
                        <Img objectFit='fill' width='24' height='24' src={getCryptoImg(selectedValue.id)} />
                    </div>
                    : null
                }
                <p className={ classes.textWrapper }>{ selectedValue.name }</p>
            </button>
            {   
                optionsVisible ? (
                    <div className={optionsClass}>
                        {
                            valuesArr.map((item) => {
                                if (item.id === selectedValue.id) return null;
                                return (
                                    <div
                                        className={ classes.option }
                                        key={item.id}
                                        onClick={(_) => setSelectedValue(item)}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })
                        }
                    </div>
                ) : null
            }
        </div>
    );
};

export default Select;
