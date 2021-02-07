import { Obj } from 'reinforcements';

class Data {
    /**
     * Constructor
     *
     * @param  {object} data
     */
    constructor(data = {}) {
        this.data = data;
    }
    /**
     * Set data
     *
     * @param   {string} key
     * @param   {any} value
     * @returns {Data}
     */
    set(key, value) {
        Obj.set(this.data, key, value);
        return this;
    }
    /**
     * Get data for the given key
     *
     * @param  {string} key
     * @param  {any} $defaultValue
     * @returns {any}
     */
    get(key, $defaultValue = null) {
        return Obj.get(this.data, key, $defaultValue);
    }
    /**
     * Check if the given key exists in the data list
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return Obj.get(this.data, key, undefined) !== undefined;
    }
    /**
     * Get all data
     *
     * @returns {object}
     */
    all() {
        return this.data;
    }
    /**
     * Merge the given object with current object
     *
     * @param   {MixedObject} newData
     * @returns {Data}
     */
    merge(newData) {
        this.data = Obj.merge(this.data, newData);
        return this;
    }
    /**
     * Get a new instance and clone the current data
     *
     * @returns {Data}
     */
    clone() {
        return new Data(Obj.merge(this.data, {}));
    }
}

export default Data;
