import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

/**
 * Checks whether the 2 arrays have the same elements
 * @param {Array} a
 * @param {Array} b
 * @return {boolean} True/False whether the arrays have the same elements
 */
export const areArrayElementsEqual = <T>(a: Array<T>, b: Array<T>): boolean => {
  return a?.length === b?.length && a.every((i) => b.map((j) => JSON.stringify(j)).includes(JSON.stringify(i)));
};

/**
 * Checks whether the contents of 2 are equal
 * @param {Set} a - Set A
 * @param {Set} b - Set B
 * @returns {boolean} True/False whether sets are equal
 */
export const areSetsEqual = <T>(a: Set<T>, b: Set<T>) => {
  if (a?.size !== b?.size) return false;
  for (const i of a) if (!b.has(i)) return false;
  return true;
};

/**
 * Get s serializable firebase error object (ngrx friendly)
 * @param {FirebaseError} error
 * @returns {FirebaseError} serializable error object
 */
export const getSerializableFirebaseError = (error: FirebaseError): FirebaseError => {
  return { code: error.code, name: error.name, message: error.message, stack: error.stack };
};

/**
 * Convert string to title case
 * @param {string} str
 * @return {string} Title case string
 */
export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
