import { Component } from '../../ecs';

export type CameraComponentOptions = {
  zoom: number,
  zoomSensitivity: number,
  panSensitivity: number,
  minZoom: number,
  maxZoom: number,
  isStatic: boolean,
  allowPanning: boolean,
  allowZooming: boolean,
}

const defaultOptions: CameraComponentOptions = {
  zoomSensitivity: 0.001,
  panSensitivity: 0.5,
  minZoom: 0.5,
  maxZoom: 3,
  isStatic: false,
  zoom: 1,
  allowPanning: true,
  allowZooming: true
} 

export class CameraComponent implements Component {
  name: symbol;
  zoom: number;
  zoomSensitivity: number;
  panSensitivity: number;
  minZoom: number;
  maxZoom: number;
  isStatic: boolean;
  allowPanning: boolean;
  allowZooming: boolean;

  static symbol = Symbol('Camera');

  static createDefaultCamera(isStatic: boolean = false) {
    const camera = new CameraComponent();
    camera.isStatic = isStatic;

    return camera;
  }

  constructor(options: Partial<CameraComponentOptions> = defaultOptions) {
    const mergedOptions: CameraComponentOptions = {...defaultOptions, ...options};

    this.name = CameraComponent.symbol;
    this.zoom = mergedOptions.zoom;
    this.zoomSensitivity = mergedOptions.zoomSensitivity;
    this.panSensitivity = mergedOptions.panSensitivity;
    this.minZoom = mergedOptions.minZoom;
    this.maxZoom = mergedOptions.maxZoom;
    this.isStatic = mergedOptions.isStatic;
    this.allowPanning = mergedOptions.allowPanning;
    this.allowZooming = mergedOptions.allowZooming;
  }
}
