interface NormalObject {
    [key: string]: any;
}
declare const config: {
    /**
     * Set the given key/value in our configurations list
     *
     * @param   {string | NormalObject} key
     * @param   {any} value
     * @returns void
     */
    set(key: string | NormalObject, value?: any): void;
    /**
     * Get the value for the given key, otherwise return the given default value
     * P.S data will be grabbed using dot notation
     * i.e name.first
     * @param   {string} key
     * @param   {any} defaultValue
     * @returns any
     */
    get(key: string, defaultValue?: any): any;
    /**
     * Get all configurations
     */
    list(): NormalObject;
};
export default config;
