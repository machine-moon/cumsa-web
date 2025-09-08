import { render } from "@testing-library/react";
import { UploadPreview } from "./UploadPreview";

test("UploadPreview snapshot", () => {
  const images = ["/events/test1.jpg", "/events/test2.png"];
  const { asFragment } = render(<UploadPreview images={images} />);
  expect(asFragment()).toMatchSnapshot();
});
