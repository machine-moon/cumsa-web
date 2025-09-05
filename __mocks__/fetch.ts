const fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
    text: () => Promise.resolve(""),
    status: 200,
  }),
);
export default fetch;
export { fetch };
