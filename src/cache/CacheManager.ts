import config from "./../config";
import CacheDriverInterface from "./CacheDriverInterface";
import EncryptedLocalStorageDriver from "./drivers/EncryptedLocalStorageDriver";

export class CacheManager implements CacheDriverInterface {
    /**
     * Cache Driver Engine
     * 
     * @var {CacheDriverInterface}
     */
    private driver: CacheDriverInterface = config.get('cache.driver') || new EncryptedLocalStorageDriver();

    /**
     * Set driver engine
     * 
     * @param CacheDriverInterface driver
     */
    public setDriver(driver: CacheDriverInterface): void {
        this.driver = driver;
    }

    /**
     * Get driver engine
     * 
     * @returns {CacheDriverInterface}
     */
    public getDriver(): CacheDriverInterface {
        return this.driver;
    }

    /**
     * Set cache into storage
     * @param {string} key 
     * @param {any} value 
     */
    public set(key: string, value: any): void {
        this.driver.set(key, value);
    }

    /**
     * Get value from cache engine, if key does not exist return default value
     * @param {string} key 
     * @param {any} defaultValue  
     */
    public get(key: string, defaultValue: any = null): any {
        return this.driver.get(key, defaultValue);
    }

    /**
     * Determine whether the cache engine has the given key
     * 
     * @param {string} key
     * @returns {boolean} 
     */
    public has(key: string): boolean {
        return this.driver.has(key);
    }

    /**
     * Remove the given key from the cache storage
     * 
     * @param  {string} key
     */
    public remove(key: string): void {
        this.driver.remove(key);
    }
}

const cacheManager = new CacheManager();

export default cacheManager;