// Global mock for file system operations
export const readdirSync = jest.fn(() => ["test1.jpg", "test2.jpg", "test3.png"]);
export const existsSync = jest.fn(() => true);
export const writeFileSync = jest.fn();
export const unlinkSync = jest.fn();
