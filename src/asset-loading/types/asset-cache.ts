export interface AssetCache<T> {
    assets: Map<string, T>;
    get: (path: string) => T;
    load:(path: string) => Promise<void>;
    getOrLoad: (path: string) => Promise<T>;
}