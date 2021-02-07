interface MixedObject {
    [key: string]: any;
}
export default class Data {
    data: MixedObject;
    /**
     * Constructor
     *
     * @param  {object} data
     */
    constructor(data?: MixedObject);
    /**
     * Set data
     *
     * @param   {string} key
     * @param   {any} value
     * @returns {Data}
     */
    set(key: string, value: any): Data;
    /**
     * Get data for the given key
     *
     * @param  {string} key
     * @param  {any} $defaultValue
     * @returns {any}
     */
    get(key: string, $defaultValue?: any): any;
    /**
     * Check if the given key exists in the data list
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key: string): boolean;
    /**
     * Get all data
     *
     * @returns {object}
     */
    all(): MixedObject;
    /**
     * Merge the given object with current object
     *
     * @param   {MixedObject} newData
     * @returns {Data}
     */
    merge(newData: MixedObject): Data;
    /**
     * Get a new instance and clone the current data
     *
     * @returns {Data}
     */
    clone(): Data;
}
export {};
