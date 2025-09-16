import { render } from "@testing-library/react";
import { ImageManagerClient } from "./ImageManagerClient";

test("ImageManagerClient snapshot", () => {
  const { asFragment } = render(
    <ImageManagerClient
      images={[]}
      uploadAction={async () => {}}
      deleteAction={async () => {}}
      renameAction={async () => {}}
      usageAction={async () => 0}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
