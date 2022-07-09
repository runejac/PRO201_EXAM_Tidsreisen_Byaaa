/**
 * @jest-environment jsdom
 */

import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage.jsx";
import renderer from "react-test-renderer";
import { MapContext } from "../src/application.jsx";
import { act, Simulate } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

//TODO: Simulere at man skriver i input-felt og trykker på knapp,
//      både med ny bruker og eksisterende

describe("LoginPage", () => {
  it("shows snapshot", async () => {
    const context = jest.fn();
    const component = renderer.create(
      <MemoryRouter>
        <MapContext.Provider value={{ context }}>
          <LoginPage />
        </MapContext.Provider>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should test input on LoginPage", async function () {
    const context = jest.fn();
    const container = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <MapContext.Provider value={{ context }}>
          <LoginPage />
        </MapContext.Provider>
      </MemoryRouter>,
      container
    );

    const inputTag = container.querySelector("[data-testid=input-login]");
    fireEvent.change(inputTag, { target: { value: "Hildur" } });
    expect(inputTag.value).toBe("Hildur");
  });
});
