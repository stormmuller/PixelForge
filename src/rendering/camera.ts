export class Camera {
  public zoom: number;
  public zoomSensitivity: number;
  public panSensitivity: number;
  public minZoom: number;
  public maxZoom: number;
  public isStatic: boolean;

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
