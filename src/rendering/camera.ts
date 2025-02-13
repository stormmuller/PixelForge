/**
 * The `Camera` class represents a camera in the rendering system.
 * It provides properties for zooming and panning sensitivity, as well as options to restrict zoom levels and enable/disable panning and zooming.
 */
export class Camera {
  /** The current zoom level of the camera. */
  public zoom: number;

  /** The sensitivity of the zoom controls. */
  public zoomSensitivity: number;

  /** The sensitivity of the panning controls. */
  public panSensitivity: number;

  /** The minimum zoom level allowed. */
  public minZoom: number;

  /** The maximum zoom level allowed. */
  public maxZoom: number;

  /** Indicates if the camera is static (non-movable). */
  public isStatic: boolean;

  /**
   * Constructs a new instance of the `Camera` class.
   * @param zoomSensitivity - The sensitivity of the zoom controls (default: 0.001).
   * @param panSensitivity - The sensitivity of the panning controls (default: 0.5).
   * @param minZoom - The minimum zoom level allowed (default: 0.5).
   * @param maxZoom - The maximum zoom level allowed (default: 3).
   * @param isStatic - Indicates if the camera is static (non-movable) (default: false).
   * @param zoom - The initial zoom level of the camera (default: 1).
   */
  constructor(
    zoomSensitivity: number = 0.001,
    panSensitivity: number = 0.5,
    minZoom: number = 0.5,
    maxZoom: number = 3,
    isStatic: boolean = false,
    zoom: number = 1,
  ) {
    this.zoom = zoom;
    this.zoomSensitivity = zoomSensitivity;
    this.panSensitivity = panSensitivity;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this.isStatic = isStatic;
  }
}
