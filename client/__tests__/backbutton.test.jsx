/**
 * @jest-environment jsdom
 */

import React from "react";
import { BackButton } from "../src/components/BackButton.jsx";
import { fireEvent, render } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("BackButton", () => {
  it("shows snapshot", async () => {
    const component = render(<BackButton />);
    expect(component).toMatchSnapshot();
  });

  it("simulates click", async () => {
    const { getByTestId } = render(<BackButton />);
    fireEvent.click(getByTestId(/backArrow/i));
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });
});
