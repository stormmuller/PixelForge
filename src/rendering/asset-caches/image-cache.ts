import { AssetCache } from "../../asset-loading";

export class ImageCache implements AssetCache<HTMLImageElement> {
  assets = new Map<string, HTMLImageElement>();
  
  get = (path: string) => {
    const image = this.assets.get(path);

    if (!image) {
      throw new Error(`Image with path "${path}" not found in store.`);
    }

    return image;
  };

  load = async (path: string) => {
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
  };

  getOrLoad = async (path: string) => {
    if (!this.assets.has(path)) {
      await this.load(path);
    } 

    return this.get(path);
  };
}
