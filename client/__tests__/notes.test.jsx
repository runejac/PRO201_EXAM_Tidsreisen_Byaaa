/**
 * @jest-environment jsdom
 */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import Notes from "../src/pages/capsules/AudioCapsule/Notes.jsx";

describe("Notes", () => {
  it("shows snapshot", async () => {
    const component = render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
