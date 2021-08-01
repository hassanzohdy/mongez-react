export interface UserInfo {
    /**
     * Current access token
     */
    accessToken?: string;
    /**
     * Any other data
     */
    [key: string]: any;
};

export interface UserInterface extends UserInfo {
    /**
     * Get cache key
     * 
     * @returns {string}
     */
    getCacheKey(): string;

    /**
     * Check if user is logged in
     * 
     * @returns {boolean}
     */
    isLoggedIn(): boolean;

    /**
     * Check if user is not logged in
     * 
     * @returns {boolean}
     */
    isNotLoggedIn(): boolean;

    /**
     * Log the user in 
     * It will store the data in the storage engine i.e Local Storage
     * But will not make the ajax request
     * 
     * @param  {UserInfo} userData 
     * @returns {void}
     */
    login(userData: UserInfo);

    /**
     * Log the user out
     */
    logout();

    /**
     * Get user access token
     * 
     * @returns {string}
     */
    getAccessToken(): string

    /**
     * Update current access token
     * 
     * @param {string} newAccessToken 
     */
     updateAccessToken(newAccessToken: string): void;

    /**
     * Set the given value
     * 
     * @param   {string} key  
     * @param   {any} value
     */
    set(key: string, value: any);

    /**
     * Reset user info excluding access token if not provided with the given data
     *  
     * @param {object} newInfo 
     */
    update(newInfo: UserInfo);

    /**
     * Get value for the given key, otherwise return default value
     * 
     * @param   {string} key  
     * @param   {any} defaultValue
     * @returns {any}  
     */
    get(key: string, defaultValue: any): any;

    /**
     * Set user permissions list  
     */
    setPermissions(permissions: object);

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
    onChange(key: string, callback: Function);

    /**
     * Check if the given key is being watched
     * 
     * @param  {string} key
     * @returns {boolean}
     */
    isBeingWatched(key: string): boolean;

    /**
     * Get all user data
     * 
     * @returns {UserInfo}
     */
    all(): UserInfo;
}

export type Role = {
    /**
     * Role Displayed Text
     */
    text: string;
    /**
     * Role Server Name
     */
    name: string;
};

export type PermissionGroup = {
    /**
     * Permission Displayed Text
     */
    text: string;
    /**
     * Permission Server Name
     */
    name: string;
    /**
     * List of Roles
     */
    roles: Role[];
};
