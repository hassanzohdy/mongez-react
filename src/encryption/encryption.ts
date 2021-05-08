import config from '../config';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

/**
 * Get the encrypted value of the given key and decrypt its value if found
 * 
 * @param {any} value 
 * @param {string} key 
 * @param {any} driver
 * @returns {string} 
 */
export function encrypt(value: any, key: string = config.get('encryption.key'), driver: any = config.get('encryption.algorithm', AES)): string {
    return driver.encrypt(JSON.stringify({
        data: value,
    }), key).toString();
}

/**
 * Get the encrypted value of the given cypher text and decrypt its value if found
 * 
 * @param {string} cypher
 * @param {string} key 
 * @param {any} driver
 * @returns {string} 
 */
export function decrypt(cypher: string, key: string = config.get('encryption.key'), driver: any = AES): string | null {
    try {
        let value = driver.decrypt(cypher, key).toString(CryptoJS.enc.Utf8);

        if (!value) return null;

        return JSON.parse(value).data;
    } catch (error) {
        console.warn(error);
        return null;
    }
}