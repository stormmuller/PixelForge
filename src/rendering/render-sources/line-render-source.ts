import { Path } from '../../common';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type LineRenderSourceOptions = {
  path: Path;
  radius?: number;
  color?: string;
  lineWidth?: number;
};

const defaultOptions = {
  radius: 0,
  color: 'black',
  lineWidth: 1,
};

export class LineRenderSource implements RenderSource {
  public path: Path;
  public radius: number;
  public color: string;
  public lineWidth: number;
  public renderEffects: RenderEffects;

  constructor(
    options: LineRenderSourceOptions,
    renderEffects: RenderEffects = {},
  ) {
    this._validatePath(options.path);

    const { path, radius, color, lineWidth } = {
      ...defaultOptions,
      ...options,
    };

    this.path = path;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;

    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void => {
    layer.context.beginPath();
    layer.context.strokeStyle = this.color;
    layer.context.lineWidth = this.lineWidth;
    layer.context.lineCap = 'round';
    layer.context.lineJoin = 'round';

    for (const point of this.path) {
      layer.context.lineTo(point.x, point.y);
    }

    layer.context.stroke();
  };

  public update = (options: Partial<LineRenderSourceOptions>): void => {
    const { path, radius, color, lineWidth } = {
      path: this.path,
      radius: this.radius,
      color: this.color,
      lineWidth: this.lineWidth,
      ...options,
    };

    this._validatePath(path);

    this.path = path;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;
  };

  private _validatePath = (path: Path): void => {
    if (!path || path.length < 2) {
      throw new Error(
        'LineRenderSource requires at least 2 points to be defined in the path',
      );
    }
  }
}
