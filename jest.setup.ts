import fetch from "./__mocks__/fetch";

(global.fetch as jest.Mock) = fetch;
import "@testing-library/jest-dom";
