import BaseCacheEngine from "./BaseCacheEngine";
import { decrypt, encrypt } from "../../encryption";
import CacheDriverInterface from "../CacheDriverInterface";

export default class EncryptedLocalStorageDriver extends BaseCacheEngine implements CacheDriverInterface {
    /**
     * Set data into storage engine
     * @param {string} key 
     * @param {value} value 
     */
    public set(key: string, value: any) {
        this.storage.setItem(this.getKey(key), encrypt(value));
    }

    /**
     * Get vale from storage engine
     * 
     * @param   {string} key 
     * @returns {any}
     */
    public get(key: string, defaultValue: any = null) {
        let value = this.storage.getItem(this.getKey(key));

        return value ? decrypt(value) : defaultValue;
    }

    /**
     * Remove key from storage
     * 
     * @param  {string} key  
     */
    public remove(key: string) {
        this.storage.removeItem(this.getKey(key));
    }
}