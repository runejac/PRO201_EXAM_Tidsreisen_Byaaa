import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MyFindings } from "../src/pages/MyFindings.jsx";
import renderer from "react-test-renderer";
import { User } from "../src/application.jsx";

describe("MyFindings", () => {
  it("shows snapshot", async () => {
    const user = { name: "Hei", points: 23, finishedCapsules: [] };
    const component = renderer.create(
      <MemoryRouter>
        <User.Provider value={{ user }}>
          <MyFindings />
        </User.Provider>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
