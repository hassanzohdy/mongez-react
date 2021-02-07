export declare type Role = {
    /**
     * Role Displayed Text
     */
    text: string;
    /**
     * Role Server Name
     */
    name: string;
};
export declare type PermissionGroup = {
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
/**
 * Ignore from the given permissions the given roles
 *
 * @param {object} permission
 * @param {array}
 */
export declare function ignoreRolesFromCrud(permission: any, ignoredRoles: string[]): any;
/**
 * Get permissions includes the single details page
 *
 * @param permission
 * @param singularName
 * @param rolesTypes
 */
export declare function viewableCrud(permission: string, singularName: string): PermissionGroup;
/**
 * Get full roles for basic crud operations
 *
 * @param {string} permission
 * @param {string} singularName
 * @param {string} singularName
 */
export declare function crud(permission: string, singularName: string, extraRoles?: String[] | Role[]): PermissionGroup;
