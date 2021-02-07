declare const _default: {
    /**
     * Set the storage engine
     */
    storage: Storage;
    /**
     * Set data into storage engine
     * @param {string} key
     * @param {value} value
     */
    set(key: string, value: any): void;
    /**
     * Get vale from storage engine
     *
     * @param   {string} key
     * @returns {any}
     */
    get(key: string, defaultValue?: any): any;
    /**
     * Remove key from storage
     *
     * @param  {string} key
     */
    remove(key: string): void;
};
export default _default;
