import { Vector2 } from '../../math';
import { Collider } from './collider';

export class PolygonCollider implements Collider<PolygonCollider> {
  public points: Vector2[];

  constructor(points: Vector2[]) {
    this.points = points;
  }

  get minX(): number {
    let min = this.points[0].x;
    for (let i = 1; i < this.points.length; i++) {
      if (this.points[i].x < min) {
        min = this.points[i].x;
      }
    }
    return min;
  }

  get maxX(): number {
    let max = this.points[0].x;
    for (let i = 1; i < this.points.length; i++) {
      if (this.points[i].x > max) {
        max = this.points[i].x;
      }
    }
    return max;
  }

  get minY(): number {
    let min = this.points[0].y;
    for (let i = 1; i < this.points.length; i++) {
      if (this.points[i].y < min) {
        min = this.points[i].y;
      }
    }
    return min;
  }

  get maxY(): number {
    let max = this.points[0].y;
    for (let i = 1; i < this.points.length; i++) {
      if (this.points[i].y > max) {
        max = this.points[i].y;
      }
    }
    return max;
  }

  /**
   * Check if a point lies inside this polygon using the winding number algorithm
   */
  public contains = (point: Vector2): boolean => {
    let windingNumber = 0;
    const n = this.points.length;

    for (let i = 0; i < n; i++) {
      const current = this.points[i];
      const next = this.points[(i + 1) % n];

      // Check if the ray from 'point' crosses this edge
      if (current.y <= point.y) {
        if (next.y > point.y) {
          // Potentially an upward crossing
          if (this._isLeft(current, next, point) > 0) {
            ++windingNumber;
          }
        }
      } else {
        if (next.y <= point.y) {
          // Potentially a downward crossing
          if (this._isLeft(current, next, point) < 0) {
            --windingNumber;
          }
        }
      }
    }

    // If the winding number is nonzero, the point is inside
    return windingNumber !== 0;
  };

  /**
   * Combine (union) this polygon with another polygon by taking
   * the convex hull of all points.
   */
  public combine = (other: PolygonCollider): PolygonCollider => {
    const allPoints = [...this.points, ...other.points];
    const hull = this._computeConvexHull(allPoints);
    return new PolygonCollider(hull);
  };

  /**
   * Combine (union) this polygon with multiple polygons by taking
   * the convex hull of all points.
   */
  public combineAll = (others: PolygonCollider[]): PolygonCollider => {
    let allPoints = [...this.points];
    for (const pc of others) {
      allPoints = allPoints.concat(pc.points);
    }
    const hull = this._computeConvexHull(allPoints);
    return new PolygonCollider(hull);
  };

  /**
   * Returns > 0 if 'point2' is left of the directed segment (point0 -> point1)
   * Returns = 0 if 'point2' is exactly on the line
   * Returns < 0 otherwise
   */
  private _isLeft = (point0: Vector2, point1: Vector2, point2: Vector2): number => {
    return (
      (point1.x - point0.x) * (point2.y - point0.y) -
      (point2.x - point0.x) * (point1.y - point0.y)
    );
  }

  /**
   * Computes the convex hull of a set of points using the Monotone Chain algorithm.
   */
  private _computeConvexHull = (points: Vector2[]): Vector2[] => {
    if (points.length < 3) {
      // With fewer than 3 points, the hull is just the set of points itself.
      return points;
    }

    // Sort points primarily by x ascending, secondarily by y ascending
    points = points
      .slice()
      .sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));

    const lower: Vector2[] = [];
    for (const p of points) {
      while (
        lower.length >= 2 &&
        this._cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
      ) {
        lower.pop();
      }
      lower.push(p);
    }

    const upper: Vector2[] = [];
    for (let i = points.length - 1; i >= 0; i--) {
      const p = points[i];
      while (
        upper.length >= 2 &&
        this._cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
      ) {
        upper.pop();
      }
      upper.push(p);
    }

    // Remove the last element of each list because it's the starting point of the other list
    lower.pop();
    upper.pop();

    // The hull is the concatenation of lower and upper
    return lower.concat(upper);
  }

  /**
   * Cross product of vectors (p1 -> p2) x (p1 -> p3).
   */
  private _cross = (p1: Vector2, p2: Vector2, p3: Vector2): number => {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  }
}
