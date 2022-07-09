/**
 * @jest-environment jsdom
 */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { User } from "../src/application.jsx";
import { DatabaseContext } from "../src/contexts/databaseContext.jsx";
import { UserContext } from "../src/contexts/userContext.jsx";
import { Quiz } from "../src/pages/capsules/quizCapsule/Quiz.jsx";
import renderer from "react-test-renderer";

//TODO: Se linje 39-44, 56, og 68-239 i Quiz.jsx

describe("Quiz", () => {
  it("shows snapshot", async () => {
    const user = {
      name: "Hei",
      points: 23,
      finishedCapsules: [],
      intro: true,
      walk: false,
    };
    const context = jest.fn();
    const context2 = jest.fn();
    let component;

    component = renderer.create(
      <MemoryRouter>
        <DatabaseContext.Provider value={{ context }}>
          <User.Provider value={{ user }}>
            <UserContext.Provider value={{ context2 }}>
              <Quiz />
            </UserContext.Provider>
          </User.Provider>
        </DatabaseContext.Provider>
      </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
