import CacheDriverInterface from "./CacheDriverInterface";

export default interface CacheManagerInterface extends CacheDriverInterface {
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