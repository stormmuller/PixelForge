import { Vector2 } from '../math';
import { RenderLayer } from './render-layer';
import { ClearStrategy } from './types';

export class LayerService {
  private _layers: Map<string, RenderLayer>;
  private _container: HTMLElement;

  constructor(container: HTMLElement) {
    this._container = container;
    this._layers = new Map();
  }

  public createLayer= (
    name: string,
    clearStrategy: ClearStrategy = ClearStrategy.blank,
  ) => {
    const canvas = document.createElement('canvas');
    canvas.id = `pf-canvas-${name}`;

    this._container.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Context not found');
    }

    const center = new Vector2(canvas.width / 2, canvas.height / 2);
    const layer = new RenderLayer(name, context, center, clearStrategy);

    this._layers.set(name, layer);

    layer.resize();

    return layer;
  }

  public getLayer = (name: string) => {
    const layer = this._layers.get(name);

    if (!layer) {
      throw new Error(`Layer ${name} not found`);
    }

    return layer;
  }
}
