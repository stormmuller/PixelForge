import { ImageCache } from '../asset-caches';
import { RenderSource } from './render-source';

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
  public width: number;
  public height: number;

  constructor(options: ImageRenderSourceOptions) {
    const { image, bleed } = {
      ...defaultOptions,
      ...options,
    };

    this.image = image;
    this.bleed = bleed;

    this.width = image.width + bleed;
    this.height = image.height + bleed;
  }

  public static fromImageCache = async (
    imageCache: ImageCache,
    path: string,
    bleed: number = 1,
  ) => {
    const image = await imageCache.getOrLoad(path);
    return new ImageRenderSource({
      image,
      bleed,
    });
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
