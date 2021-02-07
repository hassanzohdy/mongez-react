interface UserInfo {
    accessToken?: string;
}
export default class User {
    private cacheKey;
    private permissions;
    private userData;
    private listeners;
    /**
     * Constructor
     */
    constructor();
    /**
     * Set cache key for user
     *
     * @param {string} cacheKey
     */
    setCacheKey(cacheKey: string): void;
    /**
     * Check if user is logged in
     *
     * @returns {boolean}
     */
    isLoggedIn(): any;
    /**
     * Log the user in
     * It will store the data in the storage engine i.e Local Storage
     * But will not make the ajax request
     *
     * @param  {object} userData
     * @returns {void}
     */
    login(userData: object): void;
    /**
     * Log the user out
     */
    logout(): void;
    /**
     * Get user access token
     *
     * @returns {string}
     */
    getAccessToken(): any;
    /**
     * Set the given value
     *
     * @param   {string} key
     * @param   {any} value
     */
    set(key: string, value: any): void;
    /**
     * Reset user info excluding access token if not provided with the given data
     *
     * @param {object} newInfo
     */
    update(newInfo: UserInfo): void;
    /**
     * Get value for the given key, otherwise return default value
     *
     * @param   {string} key
     * @param   {any} defaultValue
     * @returns {any}
     */
    get(key: string, defaultValue?: any): any;
    /**
     * Set user permissions list
     */
    setPermissions(permissions: object): void;
    /**
     * Check if user has access to the given permission role
     *
     * @param {string} permission
     * @returns {boolean}
     */
    can(permission: string): boolean;
    /**
     * Detect when a value is changed
     *
     * @param {string} key
     * @param {Function} callback
     * @returns {void}
     */
    onChange(key: string, callback: Function): void;
    /**
     * Check if the given key is being watched
     *
     * @param  {string} key
     * @returns {boolean}
     */
    isBeingWatched(key: string): boolean;
    /**
     * Trigger change for the given key
     *
     * @param  {string} key
     * @param  {any} newValue
     * @param  {any} oldValue
     * @returns {void}
     */
    private triggerChange;
}
export {};
