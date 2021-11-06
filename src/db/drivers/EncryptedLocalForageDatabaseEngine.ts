import { decrypt, encrypt } from "../../encryption";
import DatabaseDriverInterface from "../DatabaseDriverInterface";
import { CacheData } from "../types";
import LocalForageDatabaseEngine from "./LocalForageDatabaseEngine";

export default class EncryptedLocalForageDatabaseEngine extends LocalForageDatabaseEngine implements DatabaseDriverInterface {
    /**
     * Set data into storage engine
     * @param {string} key 
     * @param {value} value 
     */
    public set(key: string, value: any): Promise<any> {
        return this.storage.setItem(this.getKey(key), encrypt(value));
    };

    /**
     * Get vale from storage engine
     * 
     * @param   {string} key 
     * @returns {any}
     */
    public get(key: string, cacheData: CacheData = null): Promise<any> {
        return this.dataFetcher(key, value => decrypt(value) || value, cacheData);
    }
}