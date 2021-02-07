import 'reinforcements';
import 'sprintf-js';
import '../../localization/locales.js';
import '@flk/supportive-is';
import { getCurrentUser } from '../../user/current-user.js';

/**
 * Roles List
 */
let roles = [];
/**
 * A flag to determine whether to check permissions per each route.
 */
let enablePermissions = true;
const permissionsObserver = {
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
    set(newRoles) {
        roles = roles.concat(newRoles);
    },
    /**
     * Get All Permissions Roles
    */
    list() {
        return roles;
    },
    /**
     * Check if the given permission (Role.name) is allowed for current user
     *
     * @param   {string} role
     * @returns {boolean}
     */
    isGranted(role) {
        return enablePermissions === false || getCurrentUser().can(role);
    }
};

export default permissionsObserver;
