import User from "./User";
/**
 * Set current User
 *
 * @param {User} user
 */
export declare function setCurrentUser(user: User): void;
/**
 * Get current User
 *
 * @returns {User}
 */
export declare function getCurrentUser(): User;
/**
 * Get new instance of default user
 *
 * @returns {User}
 */
export declare function defaultUser(): User;
