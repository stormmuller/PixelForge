import { beforeEach, describe, expect, it } from 'vitest';
import { Vector2 } from '../../math/vector2';
import { BoxCollider } from './box-collider';

describe('BoxCollider', () => {
  let box: BoxCollider;

  beforeEach(() => {
    box = new BoxCollider(new Vector2(0, 0), new Vector2(10, 10));
  });

  describe('constructor', () => {
    it('should create a BoxCollider with the given point and dimensions', () => {
      expect(box.point.equals(new Vector2(0, 0))).toBe(true);
      expect(box.dimensions.equals(new Vector2(10, 10))).toBe(true);
    });
  });

  describe('minX', () => {
    it('should return the minimum x-coordinate', () => {
      expect(box.minX).toBe(0);
    });
  });

  describe('maxX', () => {
    it('should return the maximum x-coordinate', () => {
      expect(box.maxX).toBe(10);
    });
  });

  describe('minY', () => {
    it('should return the minimum y-coordinate', () => {
      expect(box.minY).toBe(0);
    });
  });

  describe('maxY', () => {
    it('should return the maximum y-coordinate', () => {
      expect(box.maxY).toBe(10);
    });
  });

  describe('middleTop', () => {
    it('should return the middle point of the top edge', () => {
      expect(box.middleTop.equals(new Vector2(5, 0))).toBe(true);
    });
  });

  describe('middleBottom', () => {
    it('should return the middle point of the bottom edge', () => {
      expect(box.middleBottom.equals(new Vector2(5, 10))).toBe(true);
    });
  });

  describe('middleLeft', () => {
    it('should return the middle point of the left edge', () => {
      expect(box.middleLeft.equals(new Vector2(0, 5))).toBe(true);
    });
  });

  describe('middleRight', () => {
    it('should return the middle point of the right edge', () => {
      expect(box.middleRight.equals(new Vector2(10, 5))).toBe(true);
    });
  });

  describe('contains', () => {
    it('should return true if the point is within the box collider', () => {
      expect(box.contains(new Vector2(5, 5))).toBe(true);
    });

    it('should return false if the point is outside the box collider', () => {
      expect(box.contains(new Vector2(15, 5))).toBe(false);
    });
  });

  describe('combine', () => {
    it('should combine two box colliders into a new bounding box', () => {
      const otherBox = new BoxCollider(new Vector2(5, 5), new Vector2(10, 10));
      const combinedBox = box.combine(otherBox);
      expect(combinedBox.point.equals(new Vector2(0, 0))).toBe(true);
      expect(combinedBox.dimensions.equals(new Vector2(15, 15))).toBe(true);
    });
  });

  describe('combineAll', () => {
    it('should combine multiple box colliders into a new bounding box', () => {
      const otherBoxes = [
        new BoxCollider(new Vector2(5, 5), new Vector2(10, 10)),
        new BoxCollider(new Vector2(-5, -5), new Vector2(5, 5)),
      ];
      const combinedBox = box.combineAll(otherBoxes);
      expect(combinedBox.point.equals(new Vector2(-5, -5))).toBe(true);
      expect(combinedBox.dimensions.equals(new Vector2(20, 20))).toBe(true);
    });
  });

  describe('fromOtherBoxes', () => {
    it('should create a new bounding box that encompasses all the given box colliders', () => {
      const boxColliders = [
        new BoxCollider(new Vector2(5, 5), new Vector2(10, 10)),
        new BoxCollider(new Vector2(-5, -5), new Vector2(5, 5)),
      ];
      const combinedBox = BoxCollider.fromOtherBoxes(boxColliders);
      expect(combinedBox.point.equals(new Vector2(-5, -5))).toBe(true);
      expect(combinedBox.dimensions.equals(new Vector2(20, 20))).toBe(true);
    });

    it('should throw an error if the array of box colliders is empty', () => {
      expect(() => BoxCollider.fromOtherBoxes([])).toThrow(
        'No boxes to combine',
      );
    });
  });
});
