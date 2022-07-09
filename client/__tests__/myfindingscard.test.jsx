import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MyFindingsCard } from "../src/components/MyFindingsCard.jsx";
import renderer from "react-test-renderer";
import { User } from "../src/application.jsx";

//TODO: Teste med visse kapsler fullført

describe("MyFindingsCard", () => {
  it("shows snapshot", async () => {
    const user = { name: "Hei", points: 23, finishedCapsules: [] };
    const component = renderer.create(
      <MemoryRouter>
        <User.Provider value={{ user }}>
          <MyFindingsCard />
        </User.Provider>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
