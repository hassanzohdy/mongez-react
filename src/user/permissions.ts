import Is from '@flk/supportive-is';
import { trans } from './../localization';

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

/**
 * Ignore from the given permissions the given roles
 * 
 * @param {object} permission 
 * @param {array}  
 */
export function ignoreRolesFromCrud(permission: any, ignoredRoles: string[]) {
    permission.roles = permission.roles.filter((permissionRole: Role) => !ignoredRoles.includes(permissionRole.name));
    return permission;
}

/**
 * Get permissions includes the single details page
 * 
 * @param permission 
 * @param singularName 
 * @param rolesTypes 
 */
export function viewableCrud(permission: string, singularName: string) {
    return crud(permission, singularName, ['view']);
}

/**
 * Get full roles for basic crud operations  
 * 
 * @param {string} permission 
 * @param {string} singularName 
 * @param {string} singularName 
 */
export function crud(permission: string, singularName: string, extraRoles: String[] | Role[] = null): PermissionGroup {
    singularName = trans(singularName);

    const roles: Role[] = [
        {
            text: trans('listItems', trans(permission)),
            name: 'list',
        },
        {
            text: trans('addItem', singularName),
            name: 'add',
        },
        {
            text: trans('editItem', singularName),
            name: 'edit',
        },
        {
            text: trans('removeItem', singularName),
            name: 'delete',
        },
    ];

    if (extraRoles) {
        for (let role of extraRoles) {
            if (Is.string(role)) {
                roles.push({
                    text: trans(role + 'Item', singularName),
                    name: role as string,
                });
            } else {
                roles.push(...(extraRoles as Role[]));
            }
        }
    }

    return {
        text: trans(permission),
        name: permission,
        roles
    } as PermissionGroup;
}
