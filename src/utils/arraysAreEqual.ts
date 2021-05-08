/**
 * Determine if the given arrays are equal to each other
 * 
 * @param {array} array1 
 * @param {array} array2
 * @return {boolean} 
 */
export default function arraysAreEqual<T>(array1: Array<T>, array2: Array<T>): boolean {
    return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}