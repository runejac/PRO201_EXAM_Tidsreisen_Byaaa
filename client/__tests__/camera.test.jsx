/**
 * @jest-environment jsdom
 */

import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Camera from "../src/components/Camera.jsx";

describe("Camera", function () {
  it("should render Camera", function () {
    const container = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <Camera />
      </MemoryRouter>,
      container
    );
    expect(container).toMatchSnapshot();
  });
});
