import { describe, expect, it, vi } from 'vitest';
import { Space } from './space';
import { Vector2 } from '../../math';

describe('Space', () => {
  it('should create an instance of Space with the correct dimensions', () => {
    const dimensions = new Vector2(800, 600);
    const space = new Space(dimensions);

    expect(space.width).toBe(800);
    expect(space.height).toBe(600);
    expect(space.center.x).toEqual(400);
    expect(space.center.y).toEqual(300);
  });

  it('should update the dimensions and center point of the space', () => {
    const dimensions = new Vector2(800, 600);
    const space = new Space(dimensions);

    const newDimensions = new Vector2(1024, 768);
    space.setValue(newDimensions);

    expect(space.width).toBe(1024);
    expect(space.height).toBe(768);
    expect(space.center.x).toEqual(512);
    expect(space.center.y).toEqual(384);
  });

  it('should raise the onSpaceChange event when dimensions are updated', () => {
    const dimensions = new Vector2(800, 600);
    const space = new Space(dimensions);

    const mockRaise = vi.spyOn(space.onSpaceChange, 'raise');

    const newDimensions = new Vector2(1024, 768);
    space.setValue(newDimensions);

    expect(mockRaise).toHaveBeenCalled();
  });
});
