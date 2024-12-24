import { BoundingBox, Vector2 } from '../../math';
import { ImageCache } from '../asset-caches';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export class ImageRenderSource implements RenderSource {
  image: HTMLImageElement;
  boundingBox: BoundingBox;
  bleed: number;
  renderEffects: RenderEffects;

  constructor(
    image: HTMLImageElement,
    bleed: number = 1,
    renderEffects: RenderEffects = {},
  ) {
    this.image = image;
    this.boundingBox = new BoundingBox(
      Vector2.zero(),
      new Vector2(image.width + bleed, image.height + bleed),
    );
    this.bleed = bleed;
    this.renderEffects = renderEffects;
  }

  render(layer: RenderLayer): void {
    layer.context.drawImage(
      this.image,
      0,
      0,
      this.image.width + this.bleed,
      this.image.height + this.bleed,
    );
  }

  public static async fromImageCache(
    imageCache: ImageCache,
    path: string,
    bleed: number = 1,
    renderEffects: RenderEffects = {},
  ) {
    const image = await imageCache.getOrLoad(path);
    return new ImageRenderSource(image, bleed, renderEffects);
  }
}
