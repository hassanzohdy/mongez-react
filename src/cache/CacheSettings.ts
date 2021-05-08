import CacheDriverInterface from "./CacheDriverInterface";

export type CacheSettings = {
    /**
     * Cache Settings
     */
    cache?: {
        /**
         * The Cache drier interface, defaults to plainLocalStorage
         */
        driver?: CacheDriverInterface;
        /**
         * A prefix for each key in the driver, this is useful for multi apps in same domain
         */
        prefix?: string;
    }
};