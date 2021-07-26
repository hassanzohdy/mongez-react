import { Obj } from "reinforcements";

interface MixedObject {
    [key: string]: any;
}

export default class Data {
    /**
     * Constructor 
     * 
     * @param  {object} data
     */
    public constructor(public data: MixedObject = {}) { }

    /**
     * Set data
     * 
     * @param   {string} key
     * @param   {any} value
     * @returns {Data}
     */
    public set(key: string, value): Data {
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
    public get(key: string, $defaultValue: any = null): any {
        return Obj.get(this.data, key, $defaultValue);
    }

    /**
     * Check if the given key exists in the data list
     * 
     * @param {string} key
     * @returns {boolean}
     */
    public has(key: string): boolean {
        return Obj.get(this.data, key, undefined) !== undefined;
    }

    /**
     * Get all data
     * 
     * @returns {object}
     */
    public all(): MixedObject {
        return this.data;
    }

    /**
     * Merge the given object with current object
     * 
     * @param   {MixedObject} newData
     * @returns {Data} 
     */
    public merge(newData: MixedObject): Data {
        this.data = Obj.merge(this.data, newData);

        return this;
    }

    /**
     * Get a new instance and clone the current data
     * 
     * @returns {Data}
     */
    public clone(): Data {
        return new Data(Obj.merge(this.data, {}));
    }
}