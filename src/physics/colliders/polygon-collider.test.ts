import { describe, expect, it } from 'vitest';
import { Vector2 } from '../../math';
import { PolygonCollider } from './polygon-collider';

describe('PolygonCollider', () => {
  it('should correctly calculate minX', () => {
    const points = [new Vector2(1, 2), new Vector2(3, 4), new Vector2(-1, 0)];
    const collider = new PolygonCollider(points);

    expect(collider.minX).toBe(-1);
  });

  it('should correctly calculate maxX', () => {
    const points = [new Vector2(1, 2), new Vector2(3, 4), new Vector2(-1, 0)];
    const collider = new PolygonCollider(points);

    expect(collider.maxX).toBe(3);
  });

  it('should correctly calculate minY', () => {
    const points = [new Vector2(1, 2), new Vector2(3, 4), new Vector2(-1, 0)];
    const collider = new PolygonCollider(points);

    expect(collider.minY).toBe(0);
  });

  it('should correctly calculate maxY', () => {
    const points = [new Vector2(1, 2), new Vector2(3, 4), new Vector2(-1, 0)];
    const collider = new PolygonCollider(points);

    expect(collider.maxY).toBe(4);
  });

  describe('should correctly determine if a point is contained within the polygon(square)', () => {
    const points = [
      new Vector2(0, 0),
      new Vector2(4, 0),
      new Vector2(4, 4),
      new Vector2(0, 4),
    ];
    const collider = new PolygonCollider(points);

    it('return true if the point is in the polygon [+x inside, +y inside]', () => {
      expect(collider.contains(new Vector2(2, 2))).toBe(true);
    });

    it('return false if the point is not in the polygon [+x outside, +y outside]', () => {
      expect(collider.contains(new Vector2(5, 5))).toBe(false);
    });

    it('return false if the point is not in the polygon [+x inside, +y outside]', () => {
      expect(collider.contains(new Vector2(2, 5))).toBe(false);
    });

    it('return false if the point is not in the polygon [+x outside, -y outside]', () => {
      expect(collider.contains(new Vector2(5, -2))).toBe(false);
    });

    it('return false if the point is not in the polygon [-x outside, -y outside]', () => {
      expect(collider.contains(new Vector2(-2, -2))).toBe(false);
    });

    it('return false if the point is on the corner', () => {
      expect(collider.contains(new Vector2(0, 0))).toBe(true);
    });

    it('return false if the point is on an edge', () => {
      expect(collider.contains(new Vector2(0, 2))).toBe(true);
    });
  });

  it('should correctly combine with another PolygonCollider', () => {
    const points1 = [new Vector2(0, 0), new Vector2(0, 5), new Vector2(2.5, 5)];
    const points2 = [new Vector2(2, 1), new Vector2(1, 3), new Vector2(3, 3)];
    const collider1 = new PolygonCollider(points1);
    const collider2 = new PolygonCollider(points2);
    const combined = collider1.combine(collider2);

    expect(combined.minX).toBe(0);
    expect(combined.maxX).toBe(3);
    expect(combined.minY).toBe(0);
    expect(combined.maxY).toBe(5);

    expect(combined.points.length).toBe(5);
    expect(combined.points[0].toString()).toEqual(new Vector2(0, 0).toString());
    expect(combined.points[1].toString()).toEqual(new Vector2(2, 1).toString());
    expect(combined.points[2].toString()).toEqual(new Vector2(3, 3).toString());
    expect(combined.points[3].toString()).toEqual(
      new Vector2(2.5, 5).toString(),
    );
    expect(combined.points[4].toString()).toEqual(new Vector2(0, 5).toString());

    expect(combined.contains(new Vector2(1, 1))).toBe(true);
    expect(combined.contains(new Vector2(1.1, 3))).toBe(true);
    expect(combined.contains(new Vector2(3, 1))).toBe(false);
  });
});
