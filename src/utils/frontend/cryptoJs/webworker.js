import CryptoJS from "crypto-js";

self.addEventListener('message', messageEvent => {
    const data = JSON.parse(messageEvent.data);
    switch(data.method){
        case 'encryptPassword': {
            const salt = CryptoJS.lib.WordArray.random(128 / 8);
            const saltString = salt.toString(CryptoJS.enc.Base64);
            const key512Bits = CryptoJS.PBKDF2( data.password, saltString, {
                keySize: 512 / 32
            });
            const response = {
                hashedValue: key512Bits.toString(CryptoJS.enc.Base64),
                salt: saltString
            };
            self.postMessage(
                JSON.stringify(response)
            );
            break;
        }
        case 'verifyPassword': {
            const key512Bits = CryptoJS.PBKDF2( data.password, data.salt, {
                keySize: 512 / 32
            });
            const response = key512Bits.toString(CryptoJS.enc.Base64) === data.hashedValue;
            self.postMessage(response);
            break;
        }
        case 'encrypt': {
            console.log('encrypting');
            const encryptedValue = CryptoJS.AES.encrypt( data.value, data.secret )
            const response = encryptedValue.toString();
            self.postMessage(JSON.stringify({
                response
            }));
            break;
        }
        case 'decrypt': {
            const decryptedValue = CryptoJS.AES.decrypt( data.value, data.secret );
            const response = decryptedValue.toString(CryptoJS.enc.Utf8);
            self.postMessage(JSON.stringify({response}));
            break;
        }
    }
})