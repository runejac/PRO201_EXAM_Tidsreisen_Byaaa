/**
 * @jest-environment jsdom
 */

import React from "react";
import { ErrorModal } from "../src/components/ErrorModal.jsx";
import { fireEvent, render } from "@testing-library/react";

describe("ErrorModal", () => {
  it("shows snapshot", async () => {
    const component = render(<ErrorModal />);
    expect(component).toMatchSnapshot();
  });

  it("simulates click", async () => {
    const reload = jest.fn();

    jest
      .spyOn(window, "location", "get")
      .mockImplementation(() => ({ reload }));

    const { getByText } = render(<ErrorModal />);
    fireEvent.click(getByText(/Last inn/i, { selector: "button" }));
    expect(reload).toHaveBeenCalledTimes(1);
  });

  jest.clearAllMocks();
});
