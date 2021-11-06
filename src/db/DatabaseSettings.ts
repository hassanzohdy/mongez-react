import DatabaseDriverInterface from "./DatabaseDriverInterface";

export type DatabaseSettings = {
    /**
     * Database Settings
     */
    database?: {
        /**
         * The Database drier interface, defaults to plainLocalStorage
         */
        driver?: DatabaseDriverInterface;
        /**
         * A prefix for each key in the driver, this is useful for multi apps in same domain
         */
        prefix?: string;
    }
};