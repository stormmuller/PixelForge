export function isOneOf<T>(item: T, ...items: T[]) {
  for (const i of items) {
    if (item === i) {
      return true;
    }
  }

  return false;
}
