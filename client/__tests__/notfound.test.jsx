/**
 * @jest-environment jsdom
 */

import React from "react";
import { NotFound } from "../src/components/NotFound.jsx";
import { fireEvent, render } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("NotFound", () => {
  it("shows snapshot", async () => {
    const component = render(<NotFound />);
    expect(component).toMatchSnapshot();
  });

  it("simulates click", async () => {
    const { getByText } = render(<NotFound />);
    fireEvent.click(
      getByText(/Tilbake til startsiden/i, { selector: "button" })
    );
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
