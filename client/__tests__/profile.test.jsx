import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Profile } from "../src/pages/Profile.jsx";
import renderer from "react-test-renderer";
import { User } from "../src/application.jsx";

describe("Profile", () => {
  it("shows snapshot", async () => {
    const user = { name: "Hei", points: 23, finishedCapsules: [] };
    const component = renderer.create(
      <MemoryRouter>
        <User.Provider value={{ user }}>
          <Profile />
        </User.Provider>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
