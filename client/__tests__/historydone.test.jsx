/**
 * @jest-environment jsdom
 */

import React from "react";
import { HistoryDone } from "../src/pages/capsules/HistoryCapsule/HistoryDone.jsx";
import { fireEvent, render } from "@testing-library/react";
import { User } from "../src/application.jsx";

//TODO: Se linje 13-14, 18, og 23 i HistoryDone.jsx

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("HistoryDone", () => {
  it("shows snapshot", async () => {
    const user = {
      name: "Hei",
      points: 23,
      finishedCapsules: [],
      intro: true,
      walk: false,
    };
    const component = render(
      <User.Provider value={{ user }}>
        <HistoryDone />
      </User.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
