import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../src/components/Navbar.jsx";
import renderer from "react-test-renderer";

//TODO: Simulere click (se linje 28 i Navbar.jsx)

describe("Navbar", () => {
  it("shows snapshot", async () => {
    const component = renderer.create(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
