import config from '../config';
import { Obj } from 'reinforcements';
import { UserInterface, UserInfo } from './types';
import cache, { CacheDriverInterface } from './../cache';

export default class User implements UserInterface {
    /**
     * Permissions list
     */
    protected permissions = {};

    /**
     * User data
     */
    protected userData: object = {};

    /**
     * Events listeners
     */
    protected listeners = {};

    /**
     * Constructor
     */
    public constructor(protected cacheDriver: CacheDriverInterface = config.get('user.storageDriver', cache)) {
        this.boot();
    }
    
    /**
     * Initialize the user
     */
    public boot() {               
        this.userData = this.cacheDriver.get(this.getCacheKey(), {}) as UserInfo;
    }

    /**
     * Get cache key
     * 
     * @returns {string}
     */
    public getCacheKey(): string {
        return config.get('user.cacheKey', 'user');
    }

    /**
     * Check if user is logged in
     * 
     * @returns {boolean}
     */
    public isLoggedIn(): boolean {
        return this.getAccessToken().length > 0;
    }

    /**
     * Check if user is not logged in
     * 
     * @returns {boolean}
     */
    public isNotLoggedIn(): boolean {
        return !this.isLoggedIn();
    }

    /**
     * Log the user in 
     * It will store the data in the storage engine i.e Local Storage
     * But will not make the ajax request
     * 
     * @param  {UserInfo} userData 
     * @returns {void}
     */
    public login(userData: UserInfo) {
        this.userData = userData;

        for (let key in userData) {
            if (this.isBeingWatched(key)) {
                this.triggerChange(key, userData[key], this.get(key));
            }
        }

        this.cacheDriver.set(this.getCacheKey(), userData);
    }

    /**
     * Log the user out
     */
    public logout() {
        this.userData = {};
        this.cacheDriver.remove(this.getCacheKey());
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
     * Update current access token
     * 
     * @param {string} newAccessToken 
     */
    public updateAccessToken(newAccessToken: string): void {
        this.set('accessToken', newAccessToken);
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

        this.cacheDriver.set(this.getCacheKey(), this.userData);
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
     * Get all user data
     * 
     * @returns {UserInfo}
     */
    public all(): UserInfo {
        return this.userData;
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
}