import React from "react";
import { MemoryRouter } from "react-router-dom";
import Popup from "../src/components/Popup.jsx";
import renderer from "react-test-renderer";
import { User } from "../src/application.jsx";

describe("Popup", () => {
  it("shows snapshot", async () => {
    const user = { name: "Hei", intro: false };
    const component = renderer.create(
      <MemoryRouter>
        <User.Provider value={{ user }}>
          <Popup />
        </User.Provider>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
