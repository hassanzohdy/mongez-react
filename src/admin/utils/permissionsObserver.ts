import { PermissionsObserver } from "./types";
import { getCurrentUser, Role } from "./../../user";

/**
 * Roles List
 */
let roles: Array<Role> = [];

/**
 * A flag to determine whether to check permissions per each route.
 */
let enablePermissions: boolean = true;

const permissionsObserver: PermissionsObserver = {
    /**
     * Enable Permissions Checking
     */
    activate() {
        enablePermissions = true;
    },
    /**
     * Disable Permissions Checking
     */
    deactivate() {
        enablePermissions = false;
    },
    /**
     * Merge More Roles
     */
    set(newRoles: Array<Role>) {
        roles = roles.concat(newRoles);
    },

    /**
     * Get All Permissions Roles
    */
    list(): Array<Role> {
        return roles;
    },
    /**
     * Check if the given permission (Role.name) is allowed for current user
     * 
     * @param   {string} role
     * @returns {boolean} 
     */
    isGranted(role: string): boolean {
        return enablePermissions === false || getCurrentUser().can(role);
    }
};

export default permissionsObserver;