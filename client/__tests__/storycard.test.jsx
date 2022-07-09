/**
 * @jest-environment jsdom
 */

import React from "react";
import { MemoryRouter, ReactRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import { User } from "../src/application.jsx";
import { UserContext } from "../src/contexts/userContext.jsx";
import { StoryCard } from "../src/pages/capsules/HistoryCapsule/StoryCard.jsx";

//TODO: Se linje 43-44, 53-57, 106, og 152 i StoryCard.jsx

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    id: "Test",
  }),
}));

describe("StoryCard", () => {
  it("shows snapshot", async () => {
    const user = {
      name: "Hei",
      points: 23,
      finishedCapsules: [],
      intro: true,
      walk: false,
    };
    const capsule = {
      id: 2,
      name: "Test",
      category: "TestKategori",
      story: [
        {
          year: "År 2022",
          story: "Dette er en test",
          image: "",
          done: false,
        },
      ],
    };
    const context = jest.fn();
    const component = render(
      <User.Provider value={{ user }}>
        <UserContext.Provider value={{ context }}>
          <StoryCard historyCapsule={capsule} />
        </UserContext.Provider>
      </User.Provider>
    );
    expect(component).toMatchSnapshot();
  });
  jest.clearAllMocks();
});
