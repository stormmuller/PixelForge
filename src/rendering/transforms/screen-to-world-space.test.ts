import { describe, expect, it } from 'vitest';
import { screenToWorldSpace } from './screen-to-world-space';
import { Vector2 } from '../../math';

describe('screenToWorldSpace', () => {
  it('should convert screen position to world position correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(300, 250);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle negative screen position correctly', () => {
    const screenPosition = new Vector2(-800, -600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(-500, -350);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle negative camera position correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(-100, -100);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(100, 50);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle negative canvas center correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(-400, -300);
    const expectedWorldPosition = new Vector2(700, 550);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle negative camera zoom correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = -2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(-100, -50);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle fractional camera zoom correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 0.5;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(900, 700);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle zero screen position correctly', () => {
    const screenPosition = new Vector2(0, 0);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(-100, -50);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle zero camera position correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(0, 0);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(200, 150);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle zero camera zoom correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 1;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(500, 400);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle zero canvas center correctly', () => {
    const screenPosition = new Vector2(800, 600);
    const cameraPosition = new Vector2(100, 100);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(0, 0);
    const expectedWorldPosition = new Vector2(500, 400);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });

  it('should handle both zero screen position and camera position correctly', () => {
    const screenPosition = new Vector2(0, 0);
    const cameraPosition = new Vector2(0, 0);
    const cameraZoom = 2;
    const canvasCenter = new Vector2(400, 300);
    const expectedWorldPosition = new Vector2(-200, -150);

    const result = screenToWorldSpace(
      screenPosition,
      cameraPosition,
      cameraZoom,
      canvasCenter,
    );

    expect(result).toEqual(expectedWorldPosition);
  });
});
