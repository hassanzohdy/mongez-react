import '../localization/locales.js';
import { trans } from '../localization/translator.js';
import Is from '@flk/supportive-is';

/**
 * Ignore from the given permissions the given roles
 *
 * @param {object} permission
 * @param {array}
 */
function ignoreRolesFromCrud(permission, ignoredRoles) {
    permission.roles = permission.roles.filter((permissionRole) => !ignoredRoles.includes(permissionRole.name));
    return permission;
}
/**
 * Get permissions includes the single details page
 *
 * @param permission
 * @param singularName
 * @param rolesTypes
 */
function viewableCrud(permission, singularName) {
    return crud(permission, singularName, ['view']);
}
/**
 * Get full roles for basic crud operations
 *
 * @param {string} permission
 * @param {string} singularName
 * @param {string} singularName
 */
function crud(permission, singularName, extraRoles = null) {
    singularName = trans(singularName);
    const roles = [
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
                    name: role,
                });
            }
            else {
                roles.push(...extraRoles);
            }
        }
    }
    return {
        text: trans(permission),
        name: permission,
        roles
    };
}

export { crud, ignoreRolesFromCrud, viewableCrud };
