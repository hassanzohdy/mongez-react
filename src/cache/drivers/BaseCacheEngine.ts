import config from "../../config";
import CacheDriverInterface from "../CacheDriverInterface";

export default class BaseCacheEngine implements CacheDriverInterface {
    /**
     * Set the storage engine
     */
    public storage = localStorage;

    /**
     * Set data into storage engine
     * @param {string} key 
     * @param {value} value 
     */
    public set(key: string, value: any) {
        this.storage.setItem(this.getKey(key), JSON.stringify({
            data: value,
        }));
    };

    /**
     * Get vale from storage engine
     * 
     * @param   {string} key 
     * @returns {any}
     */
    public get(key: string, defaultValue: any = null) {
        let value = this.storage.getItem(this.getKey(key));

        if (! value) return defaultValue;

        try {
            return JSON.parse(value).data;
        } catch (error) {
            this.remove(key);
            return null;
        }
    }

    /**
     * Remove key from storage
     * 
     * @param  {string} key  
     */
    public remove(key: string) {
        this.storage.removeItem(this.getKey(key));
    }

    /**
     * Get a proper key
     * 
     * @param {string} key
     * @returns {string}
     */
    public getKey(key: string): string {
        const prefix = config.get('cache.prefix');
        return prefix ? prefix + key : key;
    }
}