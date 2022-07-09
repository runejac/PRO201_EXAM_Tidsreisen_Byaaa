import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Loading } from "../src/components/Loading.jsx";
import renderer from "react-test-renderer";

describe("Loading", () => {
  it("shows snapshot", async () => {
    const component = renderer.create(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
