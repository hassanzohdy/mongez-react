import { Obj } from 'reinforcements';
import cache from '../cache/index.js';

class User {
    /**
     * Constructor
     */
    constructor() {
        this.cacheKey = 'user';
        this.permissions = {};
        this.userData = {};
        this.listeners = {};
        this.setCacheKey(this.cacheKey);
    }
    /**
     * Set cache key for user
     *
     * @param {string} cacheKey
     */
    setCacheKey(cacheKey) {
        this.cacheKey = cacheKey;
        this.userData = cache.get(this.cacheKey, {});
    }
    /**
     * Check if user is logged in
     *
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.getAccessToken();
    }
    /**
     * Log the user in
     * It will store the data in the storage engine i.e Local Storage
     * But will not make the ajax request
     *
     * @param  {object} userData
     * @returns {void}
     */
    login(userData) {
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
    logout() {
        this.userData = {};
        cache.remove(this.cacheKey);
    }
    /**
     * Get user access token
     *
     * @returns {string}
     */
    getAccessToken() {
        return this.get('accessToken');
    }
    /**
     * Set the given value
     *
     * @param   {string} key
     * @param   {any} value
     */
    set(key, value) {
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
    update(newInfo) {
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
    get(key, defaultValue = null) {
        return Obj.get(this.userData, key, defaultValue);
    }
    /**
     * Set user permissions list
     */
    setPermissions(permissions) {
        this.permissions = permissions;
    }
    /**
     * Check if user has access to the given permission role
     *
     * @param {string} permission
     * @returns {boolean}
     */
    can(permission) {
        return Boolean(Obj.get(this.permissions, permission)) === true;
    }
    /**
     * Detect when a value is changed
     *
     * @param {string} key
     * @param {Function} callback
     * @returns {void}
     */
    onChange(key, callback) {
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
    isBeingWatched(key) {
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
    triggerChange(key, newValue, oldValue) {
        for (let callback of this.listeners[key]) {
            callback(newValue, oldValue);
        }
    }
}

export default User;
