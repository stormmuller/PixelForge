import { Path } from '../../common';
import { calculateBoxCollider } from '../../math';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type PolygonRenderSourceOptions = {
  path: Path;
  color?: string;
};

const defaultOptions = {
  color: 'black',
};

export class PolygonRenderSource implements RenderSource {
  public path: Path;
  public color: string;
  public renderEffects: RenderEffects;

  constructor(
    options: PolygonRenderSourceOptions,
    renderEffects: RenderEffects = {},
  ) {
    this._validatePath(options.path);

    const { path, color } = {
      ...defaultOptions,
      ...options,
    };

    this.path = path;
    this.color = color;

    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void => {
    layer.context.beginPath();

    for (let i = 0; i < this.path.length; i++) {
      const point = this.path.at(i);

      if (i === 0) {
        layer.context.moveTo(point.x, point.y);
      } else {
        layer.context.lineTo(point.x, point.y);
      }
    }

    layer.context.fillStyle = this.color;
    layer.context.fill();
  };

  public update = (options: Partial<PolygonRenderSourceOptions>): void => {
    const { path, color } = {
      path: this.path,
      color: this.color,
      ...options,
    };

    this._validatePath(path);

    this.path = path;
    this.color = color;
  };

  public resize = (width: number, height: number): void => {
    const boundingBox = calculateBoxCollider(this.path);
    const horizontalRatio = width / boundingBox.maxX;
    const verticalRatio = height / boundingBox.maxY;

    for (const point of this.path) {
      point.x *= horizontalRatio;
      point.y *= verticalRatio;
    }
  };

  private _validatePath = (path: Path): void => {
    if (!path || path.length < 3) {
      throw new Error(
        'PolygonRenderSource requires at least 3 points to be defined in the path',
      );
    }
  };
}
