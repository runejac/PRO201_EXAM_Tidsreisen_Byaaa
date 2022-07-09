import React from "react";
import { MemoryRouter } from "react-router-dom";
import WithNavbar from "../src/components/WithNavbar.jsx";
import renderer from "react-test-renderer";

describe("WithNavbar", () => {
  it("shows snapshot", async () => {
    const component = renderer.create(
      <MemoryRouter>
        <WithNavbar />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
