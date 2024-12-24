import { Vector2 } from '../math';
import { RenderLayer } from './render-layer';
import { ClearStrategy } from './types';

export class LayerService {
  layers: Set<RenderLayer>

  private _container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this._container = container;
    this.layers = new Set();
  }

  createLayer = (
    name: string,
    clearStrategy: ClearStrategy = ClearStrategy.BLANK,
  ) => {
    const canvas = document.createElement('canvas');
    canvas.id = `canvas-${name}`;

    this._container.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Context not found');
    }

    const center = new Vector2(canvas.width / 2, canvas.height / 2)
    const layer = new RenderLayer(name, context, center, clearStrategy);

    this.layers.add(layer);

    layer.resize();

    return layer;
  };
}
