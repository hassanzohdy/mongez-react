import { Role } from "./../../user";
export declare type PermissionsObserver = {
    /**
     * Enable Permissions Checking
     */
    activate: Function;
    /**
     * Disable Permissions Checking
     */
    deactivate: Function;
    /**
     * Merge More Roles
     */
    set(role: Array<Role>): void;
    /**
     * Get All Permissions Roles
    */
    list(): Array<Role>;
    /**
     * Check if the given permission is allowed for current user
     *
     * @param   {string} role
     * @returns {boolean}
     */
    isGranted(role: string): boolean;
};
declare const permissionsObserver: PermissionsObserver;
export default permissionsObserver;
