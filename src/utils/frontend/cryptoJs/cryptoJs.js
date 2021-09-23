export const encryptValue = ( value, secret ) => {
    return new Promise((resolve, reject) => {
        const webworker = new Worker(new URL(`./webworker.js`, import.meta.url));
        webworker.postMessage(JSON.stringify({
            method: 'encrypt',
            secret,
            value
        }))
        webworker.addEventListener('message', e => {
            webworker.terminate();
            resolve(JSON.parse(e.data));
        });
        webworker.addEventListener('error', e => {
            webworker.terminate();
            reject(JSON.parse(e.data));
        })
    })
}

export const decryptValue = ( value, secret ) => {
    return new Promise((resolve, reject) => {
        const webworker = new Worker(new URL(`./webworker.js`, import.meta.url));
        webworker.postMessage(JSON.stringify({
            method: 'decrypt',
            secret,
            value
        }))
        webworker.addEventListener('message', e => {
            webworker.terminate();
            resolve(JSON.parse(e.data));
        });
        webworker.addEventListener('error', e => {
            webworker.terminate();
            reject(JSON.parse(e.data));
        })
    });
}

export const encryptPassword = ( password ) => {
    return new Promise((resolve, reject) => {
        const webworker = new Worker(new URL(`./webworker.js`, import.meta.url));
        webworker.postMessage(JSON.stringify({
            method: 'encryptPassword',
            password
        }))
        webworker.addEventListener('message', e => {
            webworker.terminate();
            resolve(JSON.parse(e.data));
        });
        webworker.addEventListener('error', e => {
            webworker.terminate();
            reject(JSON.parse(e.data));
        })
    })
};

export const verifyPassword = ( password, salt, hashedValue ) => {
    return new Promise((resolve, reject) => {
        const webworker = new Worker(new URL(`./webworker.js`, import.meta.url));
        webworker.postMessage(JSON.stringify({
            method: 'verifyPassword',
            password,
            salt, 
            hashedValue
        }))
        webworker.addEventListener('message', e => {
            webworker.terminate();
            resolve(JSON.parse(e.data));
        });
        webworker.addEventListener('error', e => {
            webworker.terminate();
            reject(JSON.parse(e.data));
        })
    })
}