import cache from './../cache';
import { Obj } from 'reinforcements';

interface UserInfo {
    accessToken?: string
};

const DEFAULT_CACHE_KEY = 'user';

export default class User {
    /**
     * 
     */
    protected cacheKey: string;
    protected permissions = {};
    protected userData: object = {};
    protected listeners = {};

    /**
     * Constructor
     */
    constructor() {
        this.setCacheKey(this.getCacheKey());
    }

    /**
     * Get cache key
     * 
     * @returns {string}
     */
    public getCacheKey(): string {
        return DEFAULT_CACHE_KEY;
    }

    /**
     * Set cache key for user 
     * 
     * @param {string} cacheKey 
     */
    public setCacheKey(cacheKey: string) {
        this.cacheKey = cacheKey;
        this.userData = cache.get(this.cacheKey, {});
    }

    /**
     * Check if user is logged in
     * 
     * @returns {boolean}
     */
     public isLoggedIn() {
        return this.getAccessToken().length > 0;
    }

    /**
     * Check if user is not logged in
     * 
     * @returns {boolean}
     */
     public isNotLoggedIn() {
        return ! this.isLoggedIn();
    }

    /**
     * Log the user in 
     * It will store the data in the storage engine i.e Local Storage
     * But will not make the ajax request
     * 
     * @param  {object} userData 
     * @returns {void}
     */
    public login(userData: object) {
        this.userData = userData;

        for (let key in userData) {
            if (this.isBeingWatched(key)) {
                this.triggerChange(key, userData[key], this.get(key));
            }
        }

        cache.set(this.cacheKey, userData);
    }

    /**
     * Log the user out
     */
    public logout() {
        this.userData = {};
        cache.remove(this.cacheKey);
    }

    /**
     * Get user access token
     * 
     * @returns {string}
     */
    public getAccessToken() {
        return this.get('accessToken', '');
    }

    /**
     * Set the given value
     * 
     * @param   {string} key  
     * @param   {any} value
     */
    public set(key: string, value: any) {
        if (this.isBeingWatched(key)) {
            this.triggerChange(key, value, this.get(key));
        }

        Obj.set(this.userData, key, value);

        cache.set(this.cacheKey, this.userData);
    }

    /**
     * Reset user info excluding access token if not provided with the given data
     *  
     * @param {object} newInfo 
     */
    public update(newInfo: UserInfo) {
        if (!newInfo.accessToken) {
            newInfo.accessToken = this.getAccessToken();
        }

        this.login(newInfo);
    }

    /**
     * Get value for the given key, otherwise return default value
     * 
     * @param   {string} key  
     * @param   {any} defaultValue
     * @returns {any}  
     */
    public get(key: string, defaultValue: any = null) {
        return Obj.get(this.userData, key, defaultValue);
    }

    /**
     * Set user permissions list  
     */
    public setPermissions(permissions: object) {
        this.permissions = permissions;
    }

    /**
     * Check if user has access to the given permission role 
     * 
     * @param {string} permission
     * @returns {boolean}
     */
    public can(permission: string) {
        return Boolean(Obj.get(this.permissions, permission)) === true;
    }

    /**
     * Detect when a value is changed
     * 
     * @param {string} key 
     * @param {Function} callback
     * @returns {void}
     */
    public onChange(key: string, callback: Function) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(callback);
    }

    /**
     * Check if the given key is being watched
     * 
     * @param  {string} key
     * @returns {boolean}
     */
    public isBeingWatched(key: string): boolean {
        return this.listeners[key] !== undefined;
    }

    /**
     * Trigger change for the given key
     * 
     * @param  {string} key
     * @param  {any} newValue
     * @param  {any} oldValue
     * @returns {void}
     */
    private triggerChange(key: string, newValue: any, oldValue: any): void {
        for (let callback of this.listeners[key]) {
            callback(newValue, oldValue);
        }
    }

    /**
     * Get all user data
     * 
     * @returns {object}
     */
    public all() {
        return this.userData;
    }
}