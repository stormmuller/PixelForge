import { ImageCache } from '../asset-caches';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type ImageRenderSourceOptions = {
  image: HTMLImageElement;
  bleed?: number;
};

const defaultOptions = {
  bleed: 1,
};

export class ImageRenderSource implements RenderSource {
  public image: HTMLImageElement;
  public bleed: number;
  public renderEffects: RenderEffects;
  public width: number;
  public height: number;

  constructor(
    options: ImageRenderSourceOptions,
    renderEffects: RenderEffects = {},
  ) {
    const { image, bleed } = {
      ...defaultOptions,
      ...options,
    };

    this.image = image;
    this.bleed = bleed;

    this.width = image.width + bleed;
    this.height = image.height + bleed;

    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void => {
    layer.context.drawImage(
      this.image,
      0,
      0,
      this.image.width + this.bleed,
      this.image.height + this.bleed,
    );
  };

  public static fromImageCache = async (
    imageCache: ImageCache,
    path: string,
    bleed: number = 1,
    renderEffects: RenderEffects = {},
  ) => {
    const image = await imageCache.getOrLoad(path);
    return new ImageRenderSource(
      {
        image,
        bleed,
      },
      renderEffects,
    );
  };

  public update = (options: Partial<ImageRenderSourceOptions>): void => {
    const { image, bleed } = {
      image: this.image,
      bleed: this.bleed,
      ...options,
    };

    this.image = image;
    this.bleed = bleed;
  };

  public resize = (width: number, height: number): void => {
    this.width = width;
    this.height = height;
  };
}
