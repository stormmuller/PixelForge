import { AssetCache } from '../../asset-loading';

export class ImageCache implements AssetCache<HTMLImageElement> {
  public assets = new Map<string, HTMLImageElement>();

  public get(path: string) {
    const image = this.assets.get(path);

    if (!image) {
      throw new Error(`Image with path "${path}" not found in store.`);
    }

    return image;
  }

  public async load(path: string) {
    const image = new Image();
    image.src = path;

    return new Promise<void>((resolve, reject) => {
      image.onload = () => {
        this.assets.set(path, image);
        image.onload = null;
        image.onerror = null;
        resolve();
      };

      image.onerror = (error) => {
        image.onload = null;
        image.onerror = null;
        console.error(error);
        reject(new Error(`Failed to load image at ${path}`));
      };
    });
  }

  public async getOrLoad(path: string) {
    if (!this.assets.has(path)) {
      await this.load(path);
    }

    return this.get(path);
  }
}
