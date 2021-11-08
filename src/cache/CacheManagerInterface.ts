import CacheDriverInterface from "./CacheDriverInterface";

export default interface CacheManagerInterface {
    /**
     * Set cache into storage
     * @param {string} key 
     * @param {any} value 
     */
    set(key: string, value: any): void;
    /**
     * Get value from cache engine, if key does not exist return default value
     * @param {string} key 
     * @param {any} defaultValue  
     */
    get(key: string, defaultValue: any): any;
    /**
     * Remove the given key from the cache storage
     * 
     * @param  {string} key
     */
    remove(key: string): void;
    /**
     * Set driver engine
     * 
     * @param CacheDriverInterface driver
     */
    setDriver(driver: CacheDriverInterface): void;
    /**
     * Get driver engine
     * 
     * @returns {CacheDriverInterface}
     */
    getDriver(): CacheDriverInterface;
}