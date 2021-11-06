import { CacheData } from "./types";

export default interface DatabaseDriverInterface {
    /**
     * Set database into storage
     * @param {string} key 
     * @param {any} value 
     * @returns {Promise}
     */
    set(key: string, value: any): Promise<any>;

    /**
     * Get value from database engine, if key does not exist return default value
     * @param {string} key 
     * @param {CacheData} cachingData
     * @returns {Promise}  
     */
    get(key: string, cachingData?: CacheData): Promise<any>;

    /**
     * Remove the given key from the database storage
     * 
     * @param  {string} key
     */
    remove(key: string): Promise<any>;

    /**
     * Clear all data in database
     */
    flush(): void;
}