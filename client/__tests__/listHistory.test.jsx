/**
 * @jest-environment jsdom
 */

import ReactDOM from "react-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { DatabaseContext } from "../src/contexts/databaseContext.jsx";
import { User } from "../src/application.jsx";
import { UserContext } from "../src/contexts/userContext.jsx";
import { History } from "../src/pages/capsules/HistoryCapsule/History.jsx";

describe("ListHistory", function () {
  it("should show history", async function () {
    const user = {
      name: "Hei",
      points: 23,
      finishedCapsules: [],
      intro: true,
      walk: false,
    };

    const context = jest.fn();

    const history = [
      {
        category: "Historiekapsel",
        story: [
          {
            year: "År 0000",
            story: "test-historie",
            image: "test-bilde",
            done: false,
          },
          {
            year: "År 0000",
            story: "test-historie",
            image: "test-bilde",
            done: false,
          },
          {
            year: "År 0000",
            story: "test-historie",
            image: "test-bilde",
            done: false,
          },
          {
            done: true,
          },
        ],
        name: "testName",
        id: 1,
      },
    ];
    const container = document.createElement("div");

    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <DatabaseContext.Provider value={{ listHistory: () => history }}>
            <User.Provider value={{ user }}>
              <UserContext.Provider value={{ context }}>
                <History />
              </UserContext.Provider>
            </User.Provider>
          </DatabaseContext.Provider>
        </MemoryRouter>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
