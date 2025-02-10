import { describe, expect, it } from 'vitest';
import { Path } from '../common/path/path';
import { calculateBoxCollider } from './calculate-box-collider';
import { Vector2 } from './vector2';

describe('calculateBoxCollider', () => {
  it('should throw an error if the path has less than 2 points', () => {
    const path = new Path([new Vector2(0, 0)]);

    expect(() => calculateBoxCollider(path)).toThrow(
      'There needs to be at least 2 points in order to calculate a bounding box',
    );
  });

  it('should correctly calculate the bounding box for a simple path', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(1, 1)]);
    const boxCollider = calculateBoxCollider(path);

    expect(boxCollider.minX).toBe(0);
    expect(boxCollider.maxX).toBe(1);
    expect(boxCollider.minY).toBe(0);
    expect(boxCollider.maxY).toBe(1);
  });

  it('should correctly calculate the bounding box for a complex path', () => {
    const path = new Path([
      new Vector2(0, 0),
      new Vector2(1, 1),
      new Vector2(-1, -1),
      new Vector2(2, 2),
    ]);
    const boxCollider = calculateBoxCollider(path);

    expect(boxCollider.minX).toBe(-1);
    expect(boxCollider.maxX).toBe(2);
    expect(boxCollider.minY).toBe(-1);
    expect(boxCollider.maxY).toBe(2);
  });

  it('should correctly calculate the bounding box for a vertical line', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(0, 2)]);
    const boxCollider = calculateBoxCollider(path);

    expect(boxCollider.minX).toBe(0);
    expect(boxCollider.maxX).toBe(0);
    expect(boxCollider.minY).toBe(0);
    expect(boxCollider.maxY).toBe(2);
  });

  it('should correctly calculate the bounding box for a horizontal line', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(2, 0)]);
    const boxCollider = calculateBoxCollider(path);

    expect(boxCollider.minX).toBe(0);
    expect(boxCollider.maxX).toBe(2);
    expect(boxCollider.minY).toBe(0);
    expect(boxCollider.maxY).toBe(0);
  });
});
