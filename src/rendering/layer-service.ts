import { Vector2 } from '../math';
import { RenderLayer } from './render-layer';
import { CLEAR_STRATEGY, CLEAR_STRATEGY_KEYS } from './types';

export interface CreateLayerOptions {
  dimentions?: { width: number; height: number };
  clearStrategy?: CLEAR_STRATEGY_KEYS;
}

const defaultOptions = {
  dimentions: { width: window.innerWidth, height: window.innerHeight },
  clearStrategy: CLEAR_STRATEGY.blank,
} as const;

export class LayerService {
  private _layers: Map<string, RenderLayer>;
  private _container: HTMLElement;

  constructor(container: HTMLElement) {
    this._container = container;
    this._layers = new Map();
  }

  public createLayer = (name: string, options: CreateLayerOptions = {}) => {
    const canvas = document.createElement('canvas');
    canvas.id = `pf-canvas-${name}`;
    canvas.width = options.dimentions?.width || window.innerWidth;
    canvas.height = options.dimentions?.height || window.innerHeight;

    this._container.appendChild(canvas);

    const context = canvas.getContext('webgl2');

    if (!context) {
      throw new Error('Context not found');
    }

    const layer = this.registerLayer(name, canvas, options);

    return layer;
  };

  public registerLayer = (
    name: string,
    canvas: HTMLCanvasElement,
    options: CreateLayerOptions = {},
  ) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const layer = new RenderLayer(name, canvas, mergedOptions.clearStrategy);
    layer.resize(
      mergedOptions.dimentions.width,
      mergedOptions.dimentions.height,
    );

    this._layers.set(name, layer);

    return layer;
  };

  public getLayer = (name: string): RenderLayer => {
    const layer = this._layers.get(name);

    if (!layer) {
      throw new Error(`Layer ${name} not found`);
    }

    return layer;
  };

  public resizeAllLayers = (dimensions?: Vector2) => {
    const newDimentions =
      dimensions || new Vector2(window.innerWidth, window.innerHeight);

    for (const layer of this._layers.values()) {
      layer.resize(newDimentions.x, newDimentions.y);
    }
  };
}
