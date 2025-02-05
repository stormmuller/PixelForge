import { Vector2 } from '../math';
import { RenderLayer } from './render-layer';
import { createTextureFromImage } from './shaders';

export type SpriteOptions = {
  image: HTMLImageElement;
  renderLayer: RenderLayer;
  bleed?: number;
  pivot?: Vector2;
};

const defaultOptions = {
  bleed: 1,
  pivot: new Vector2(0.5, 0.5),
};

export class Sprite {
  public image: HTMLImageElement;
  public renderLayer: RenderLayer;
  public bleed: number;
  public width: number;
  public height: number;
  public texture: WebGLTexture;
  public pivot: Vector2;

  constructor(options: SpriteOptions) {
    const { image, bleed, pivot, renderLayer } = {
      ...defaultOptions,
      ...options,
    };

    this.image = image;
    this.renderLayer = renderLayer;
    this.bleed = bleed;
    this.width = image.width + bleed;
    this.height = image.height + bleed;
    this.texture = createTextureFromImage(renderLayer.context, this.image);
    this.pivot = pivot;
  }
}
