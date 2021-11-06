import DatabaseDriverInterface from "./DatabaseDriverInterface";

export default interface DatabaseManagerInterface extends DatabaseDriverInterface {
    /**
     * Set driver engine
     * 
     * @param DatabaseDriverInterface driver
     */
    setDriver(driver: DatabaseDriverInterface): void;
    /**
     * Get driver engine
     * 
     * @returns {DatabaseDriverInterface}
     */
    getDriver(): DatabaseDriverInterface;
}