declare module "flat-cache" {
  interface Cache {
    all(): Record<string, unknown>;
    getKey<T = unknown>(key: string): T | undefined;
    setKey<T = unknown>(key: string, value: T): void;
    removeKey(key: string): void;
    save(noPrune?: boolean): void;
  }
  function load(cacheId: string, cacheDir?: string): Cache;
  function clearCacheById(cacheId: string): void;
  function clearAll(): void;
  const flatCache = { load, clearAll, clearCacheById };
  export default flatCache;
  export { load, clearAll, clearCacheById, Cache };
}
