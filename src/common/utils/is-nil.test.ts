import { describe, expect, it } from 'vitest';
import { isNil } from './is-nil';

describe('isNil', () => {
  it('should return true for undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return false for 0', () => {
    expect(isNil(0)).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isNil('')).toBe(false);
  });

  it('should return false for a non-empty string', () => {
    expect(isNil('hello')).toBe(false);
  });

  it('should return false for an object', () => {
    expect(isNil({})).toBe(false);
  });

  it('should return false for an array', () => {
    expect(isNil([])).toBe(false);
  });
});
