/**
 * Wait for the given number of seconds
 * 
 * This function should be used with await as it returns promise
 * 
 * @param  {number} seconds
 * @return {Promise}
 */
export default function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay * 1000);
    });
}
