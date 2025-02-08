/**
 * Interface for an asset cache that manages loading and retrieving assets.
 *
 * @template T - The type of asset being cached.
 */
export interface AssetCache<T> {
  /**
   * A map of asset paths to their corresponding assets.
   */
  assets: Map<string, T>;

  /**
   * Retrieves an asset from the cache.
   * @param path - The path of the asset to retrieve.
   * @returns The cached asset.
   */
  get: (path: string) => T;

  /**
   * Loads an asset from the specified path and caches it.
   * @param path - The path of the asset to load.
   * @returns A promise that resolves when the asset is loaded and cached.
   */
  load: (path: string) => Promise<void>;

  /**
   * Retrieves an asset from the cache if it exists, otherwise loads and caches it.
   * @param path - The path of the asset to retrieve or load.
   * @returns A promise that resolves to the asset.
   */
  getOrLoad: (path: string) => Promise<T>;
}
