/**
 * Determine if the given arrays are equal to each other
 *
 * @param {array} array1
 * @param {array} array2
 * @return {boolean}
 */
function arraysAreEqual(array1, array2) {
    return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}

export default arraysAreEqual;
