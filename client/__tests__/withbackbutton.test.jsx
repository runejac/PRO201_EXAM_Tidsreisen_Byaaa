import React from "react";
import { MemoryRouter } from "react-router-dom";
import WithBackButton from "../src/components/WithBackButton.jsx";
import renderer from "react-test-renderer";

describe("WithBackButton", () => {
  it("shows snapshot", async () => {
    const component = renderer.create(
      <MemoryRouter>
        <WithBackButton />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
