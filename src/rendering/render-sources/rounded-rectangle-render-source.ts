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

export class RoundedRectangleRenderSource implements RenderSource {
  public width: number;
  public height: number;
  public radius: number;
  public color: string;
  public lineWidth: number;
  public lineColor: string;
  public renderEffects: RenderEffects;

  constructor(
    options: RoundedRectangleRenderSourceOptions,
    renderEffects: RenderEffects = {},
  ) {
    this._validateDimentions(options.width, options.height);

    const { width, height, radius, color, lineColor, lineWidth } = {
      ...defaultRoundedRectangleRenderSourceOptions,
      ...options,
    };

    this.width = width;
    this.height = height;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;

    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void => {
    layer.context.lineWidth = this.lineWidth;
    layer.context.strokeStyle = this.lineColor;

    layer.context.beginPath();
    layer.context.moveTo(this.radius, 0);

    // Top edge
    layer.context.lineTo(this.width - this.radius, 0);
    layer.context.arcTo(this.width, 0, this.width, this.radius, this.radius);

    // Right edge
    layer.context.lineTo(this.width, this.height - this.radius);
    layer.context.arcTo(
      this.width,
      this.height,
      this.width - this.radius,
      this.height,
      this.radius,
    );

    // Bottom edge
    layer.context.lineTo(this.radius, this.height);
    layer.context.arcTo(0, this.height, 0, this.height - this.radius, this.radius);

    // Left edge
    layer.context.lineTo(0, this.radius);
    layer.context.arcTo(0, 0, this.radius, 0, this.radius);

    layer.context.closePath();

    layer.context.fillStyle = this.color;
    layer.context.fill();

    layer.context.stroke();
  };

  public update = (
    options: Partial<RoundedRectangleRenderSourceOptions>,
  ): void => {
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
  };

  private _validateDimentions = (width: number, height: number) => {
    if (width <= 0 || height <= 0) {
      throw new Error('Width and height must be positive');
    }
  };
}

export const defaultRoundedRectangleRenderSourceOptions = {
  radius: 0,
  color: 'black',
  lineWidth: 0,
  lineColor: 'black',
};
