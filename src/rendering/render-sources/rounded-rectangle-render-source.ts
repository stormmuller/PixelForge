import { Vector2 } from '../../math';
import { BoxCollider } from '../../physics';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type RoundedRectangleRenderSourceOptions = {
  width: number;
  height: number;
  radius?: number;
  color?: string;
  lineWidth?: number;
  lineColor?: string;
};

const defaultOptions = {
  radius: 0,
  color: 'black',
  lineWidth: 0,
  lineColor: 'black',
};

export class RoundedRectangleRenderSource implements RenderSource {
  public width: number;
  public height: number;
  public radius: number;
  public color: string;
  public lineWidth: number;
  public lineColor: string;
  public boxCollider: BoxCollider;
  public renderEffects: RenderEffects;

  constructor(
    options: RoundedRectangleRenderSourceOptions,
    renderEffects: RenderEffects = {},
  ) {
    this._validateDimentions(options.width, options.height);

    const { width, height, radius, color, lineColor, lineWidth } = {
      ...defaultOptions,
      ...options,
    };

    this.width = width;
    this.height = height;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;

    this.boxCollider = new BoxCollider(
      Vector2.zero,
      new Vector2(this.width, this.height),
    );

    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void => {
    const ctx = layer.context;

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.lineColor;

    ctx.beginPath();
    ctx.moveTo(this.radius, 0);

    // Top edge
    ctx.lineTo(this.width - this.radius, 0);
    ctx.arcTo(this.width, 0, this.width, this.radius, this.radius);

    // Right edge
    ctx.lineTo(this.width, this.height - this.radius);
    ctx.arcTo(
      this.width,
      this.height,
      this.width - this.radius,
      this.height,
      this.radius,
    );

    // Bottom edge
    ctx.lineTo(this.radius, this.height);
    ctx.arcTo(0, this.height, 0, this.height - this.radius, this.radius);

    // Left edge
    ctx.lineTo(0, this.radius);
    ctx.arcTo(0, 0, this.radius, 0, this.radius);

    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.stroke();
  };

  public update = (options: Partial<RoundedRectangleRenderSourceOptions>): void => {
    const { width, height, radius, color, lineColor, lineWidth } = {
      width: this.width,
      height: this.height,
      radius: this.radius,
      color: this.color,
      lineWidth: this.lineWidth,
      lineColor: this.lineColor,
      ...options,
    };

    this._validateDimentions(width, height);

    this.width = width;
    this.height = height;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    
    this.boxCollider = new BoxCollider(
      Vector2.zero,
      new Vector2(this.width, this.height),
    );
  };

  private _validateDimentions = (width: number, height: number) => {
    if (width <= 0 || height <= 0) {
      throw new Error('Width and height must be positive');
    }
  };
}
