import config from "./../config";
import DatabaseDriverInterface from "./DatabaseDriverInterface";
import EncryptedLocalForageDatabaseEngine from "./drivers/EncryptedLocalForageDatabaseEngine";
import { CacheData } from "./types";

export class DatabaseManager implements DatabaseDriverInterface {
    /**
     * Database Driver Engine
     * 
     * @var {DatabaseDriverInterface}
     */
    private driver: DatabaseDriverInterface = config.get('database.driver') || new EncryptedLocalForageDatabaseEngine();

    /**
     * Set driver engine
     * 
     * @param DatabaseDriverInterface driver
     */
    public setDriver(driver: DatabaseDriverInterface): void {
        this.driver = driver;
    }

    /**
     * Get driver engine
     * 
     * @returns {DatabaseDriverInterface}
     */
    public getDriver(): DatabaseDriverInterface {
        return this.driver;
    }

    /**
     * Set database into storage
     * @param {string} key 
     * @param {any} value 
     */
    public set(key: string, value: any): Promise<any> {
        return this.driver.set(key, value);
    }

    /**
     * Get value from database engine, 
     * If the key doesn't exist and the cachingData callback 
     * 
     * @param {string} key 
     * @param {CacheData} cachingData
     */
    public get(key: string, cachingData: CacheData = null): Promise<any> {
        return this.driver.get(key, cachingData);
    }

    /**
     * Remove the given key from the database storage
     * 
     * @param  {string} key
     */
    public remove(key: string): Promise<any> {
        return this.driver.remove(key);
    }

    /**
     * Clear all data in database 
     */
    public flush(): void {
        return this.driver.flush();
    }

    /**
     * Clear all data in database 
     */
    public clear(): void {
        return this.driver.flush();
    }
}

const database = new DatabaseManager();

export default database;