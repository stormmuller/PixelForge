/**
 * Ensures that the provided value is returned as an array.
 *
 * If the value is already an array, it is returned as-is. If the value is not an array, it is wrapped in an array.
 *
 * @param value - The value to ensure as an array.
 * @returns The value as an array.
 * @example
 * enforceArray(5); // returns [5]
 * enforceArray([5]); // returns [5]
 */
export function enforceArray<T>(value: T[] | T): T[] {
  return Array.isArray(value) ? value : [value];
}
