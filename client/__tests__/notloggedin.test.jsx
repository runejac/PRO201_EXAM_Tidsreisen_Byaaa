/**
 * @jest-environment jsdom
 */

import React from "react";
import { NotLoggedIn } from "../src/components/NotLoggedIn.jsx";
import { fireEvent, render } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("NotLoggedIn", () => {
  it("shows snapshot", async () => {
    const component = render(<NotLoggedIn />);
    expect(component).toMatchSnapshot();
  });

  it("simulates click", async () => {
    const { getByText } = render(<NotLoggedIn />);
    fireEvent.click(getByText(/Logg inn/i, { selector: "button" }));
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
