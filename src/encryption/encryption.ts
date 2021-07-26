import config from '../config';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

/**
 * Get the encrypted text of the given value 
 * 
 * @param {any} value 
 * @param {string} key 
 * @param {any} driver
 * @returns {string} 
 */
export function encrypt(value: any, key: string = config.get('encryption.key'), driver: any = config.get('encryption.driver', AES)): string {
    return driver.encrypt(JSON.stringify({
        data: value,
    }), key).toString();
}

/**
 * Decrypt the given cypher text and return its original value, otherwise null will be returned.
 * 
 * @param {string} cypher
 * @param {string} key 
 * @param {any} driver
 * @returns {string|null}
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