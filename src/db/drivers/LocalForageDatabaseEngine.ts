import config from "../../config";
import localForage from 'localforage';
import DatabaseDriverInterface from "../DatabaseDriverInterface";
import { CacheData } from "../types";

export default class LocalForageDatabaseEngine implements DatabaseDriverInterface {
    /**
     * Set the storage engine
     */
    public storage;

    /**
     * Prefix key 
     */
    public prefixKey: string;

    /**
     * Constructor
     */
    public constructor() {
        this.storage = localForage.createInstance({
            name: process.env.REACT_APP_KEY_NAME,
            storeName: process.env.REACT_APP_KEY_NAME,
        });
    }

    /**
     * Set data into storage engine
     * @param {string} key 
     * @param {value} value 
     */
    public set(key: string, value: any): Promise<any> {
        return this.storage.setItem(this.getKey(key), value);
    };

    /**
     * Get vale from storage engine
     * 
     * @param   {string} key 
     * @param   {CacheData} cacheData 
     * @returns {any}
     */
    public get(key: string, cacheData: CacheData): Promise<any> {
        return this.dataFetcher(key, value => value, cacheData);
    }

    /**
     * Remove key from storage
     * 
     * @param  {string} key  
     */
    public remove(key: string): Promise<any> {
        return this.storage.removeItem(this.getKey(key));
    }

    /**
     * Get a proper key
     * 
     * @param {string} key
     * @returns {string}
     */
    public getKey(key: string): string {
        return (this.getPrefixKey() || '') + key;
    }

    /**
     * Clear all data in database
     */
    public flush(): void {
        this.storage.clear();
    }

    /**
     * Clear all data in database
     */
    public clear(): void {
        this.storage.clear();
    }

    /**
     * Get prefix key
     * 
     * @returns {string}
     */
    protected getPrefixKey(): string {
        if (this.prefixKey) return this.prefixKey;

        return this.prefixKey = config.get('database.prefix', config.get('cache.prefix'));
    }

    /**
     * Data fetcher method to get the value from the database
     * If the value doesn't exists and the cacheData method is passed, 
     * then grab it and store the data then return it
     */
    protected dataFetcher(key: string, valueHandler: (value: any) => any, cacheData = null) {
        return new Promise((resolve, reject) => {
            this.storage.getItem(this.getKey(key)).then(async (value) => {
                if (!value && cacheData) {
                    value = await cacheData();

                    this.set(key, value);
                }

                resolve(valueHandler(value));
            }).catch(reject);
        });
    }
}