export default interface CacheDriverInterface {
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
}