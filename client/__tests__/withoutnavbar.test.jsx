import React from "react";
import { MemoryRouter } from "react-router-dom";
import WithoutNavbar from "../src/components/WithoutNavbar.jsx";
import renderer from "react-test-renderer";

describe("WithoutNavbar", () => {
  it("shows snapshot", async () => {
    const component = renderer.create(
      <MemoryRouter>
        <WithoutNavbar />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
