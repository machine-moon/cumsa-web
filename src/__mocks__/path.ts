// Global mock for path operations
export const join = jest.fn((...paths: string[]) => paths.join("/"));
export const extname = jest.fn((path: string) => {
  const parts = path.split(".");
  return parts.length > 1 ? `.${parts[parts.length - 1]}` : "";
});
