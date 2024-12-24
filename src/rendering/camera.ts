export class Camera {
  zoom: number;
  zoomSensitivity: number;
  panSensitivity: number;
  minZoom: number;
  maxZoom: number;
  isStatic: boolean;

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

  reposition() {
    
  }
}
