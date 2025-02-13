import { Vector2 } from '../../math';

/**
 * Converts a position from screen space to world space.
 *
 * @param screenPosition - The position in screen space.
 * @param cameraPosition - The position of the camera in world space.
 * @param cameraZoom - The zoom level of the camera.
 * @param canvasCenter - The center of the canvas.
 * @returns The position in world space.
 */
export function screenToWorldSpace(
  screenPosition: Vector2,
  cameraPosition: Vector2,
  cameraZoom: number,
  canvasCenter: Vector2,
): Vector2 {
  return screenPosition
    .subtract(canvasCenter)
    .divide(cameraZoom)
    .add(cameraPosition);
}
