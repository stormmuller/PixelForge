/**
 * Checks if the provided item is `undefined` or `null`.
 *
 * @param item - The item to check.
 * @returns True if the item is `undefined` or `null`, false otherwise.
 * @example
 * isNil(undefined); // returns true
 * isNil(null); // returns true
 * isNil(0); // returns false
 * isNil(''); // returns false
 */
export const isNil = <T>(item: T): boolean => {
  return item === undefined || item === null;
};
