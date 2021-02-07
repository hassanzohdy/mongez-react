import User from './User.js';

let currentUser;
/**
 * Set current User
 *
 * @param {User} user
 */
function setCurrentUser(user) {
    currentUser = user;
}
/**
 * Get current User
 *
 * @returns {User}
 */
function getCurrentUser() {
    if (!currentUser) {
        setCurrentUser(defaultUser());
    }
    return currentUser;
}
/**
 * Get new instance of default user
 *
 * @returns {User}
 */
function defaultUser() {
    return new User();
}

export { defaultUser, getCurrentUser, setCurrentUser };
