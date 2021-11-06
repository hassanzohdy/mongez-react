import config from '../config';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

/**
 * Return sha1 hashed string 
 * 
 * @param {string} text 
 * @returns {string}
 */
export function md5(text: string): string {
    return CryptoJS.MD5(text).toString();
}

/**
 * Return sha1 hashed string 
 * 
 * @param {string} text 
 * @returns {string}
 */
export function sha1(text: string): string {
    return CryptoJS.SHA1(text).toString();
}

/**
 * Return sha256 hashed string 
 * 
 * @param {string} text 
 * @returns {string}
 */
export function sha256(text: string): string {
    return CryptoJS.SHA256(text).toString();
}

/**
 * Get the encrypted text of the given value 
 * 
 * @param {any} value 
 * @param {string} key 
 * @param {any} driver
 * @returns {string} 
 */
export function encrypt(value: any, key: string = config.get('encryption.key'), driver: any = config.get('encryption.driver', AES)): string {
    if (!key) {
        throw new Error('Missing Encryption key, please define it in the config in "encryption.key" key');
    }

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
    if (!key) {
        throw new Error('Missing Encryption key, please define it in the config in "encryption.key" key');
    }

    try {
        let value = driver.decrypt(cypher, key).toString(CryptoJS.enc.Utf8);

        if (!value) return null;

        return JSON.parse(value).data;
    } catch (error) {
        console.warn(error);
        return null;
    }
}