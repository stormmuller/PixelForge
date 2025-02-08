/**
 * Checks if the provided item is one of the specified items.
 *
 * @param item - The item to check.
 * @param items - The list of items to check against.
 * @returns True if the item is one of the specified items, false otherwise.
 * @example
 * isOneOf(5, 1, 2, 3, 4, 5); // returns true
 * isOneOf('a', 'b', 'c', 'd'); // returns false
 */
export function isOneOf<T>(item: T, ...items: T[]): boolean {
  for (const i of items) {
    if (item === i) {
      return true;
    }
  }

  return false;
}
