/**
 * @jest-environment jsdom
 */

import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { User } from "../src/application.jsx";
import { DatabaseContext } from "../src/contexts/databaseContext.jsx";
import { UserContext } from "../src/contexts/userContext.jsx";
import { Quiz } from "../src/pages/capsules/quizCapsule/Quiz.jsx";

describe("ListQuiz", () => {
  it("should show quiz", async () => {
    const user = {
      name: "Hei",
      points: 23,
      finishedCapsules: [],
      intro: true,
      walk: false,
    };

    const context2 = jest.fn();

    const quiz = [
      {
        category: "Quizkapsel",
        answers: [{ answer: "hei", isCorrect: false }],
        question_: "Hva?",
        name_: "Kvernhus",
        id: 3,
      },
    ];
    const elem = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <DatabaseContext.Provider value={{ listQuiz: () => quiz }}>
            <User.Provider value={{ user }}>
              <UserContext.Provider value={{ context2 }}>
                <Quiz />
              </UserContext.Provider>
            </User.Provider>
          </DatabaseContext.Provider>
        </MemoryRouter>,
        elem
      );
    });

    expect(elem.querySelectorAll(".question")[0].innerHTML).toEqual("Hva?");
  });
});
