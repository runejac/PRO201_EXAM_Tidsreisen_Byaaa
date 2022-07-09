/**
 * @jest-environment jsdom
 */

import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DatabaseContext } from "../src/contexts/databaseContext.jsx";
import { User } from "../src/application.jsx";
import { UserContext } from "../src/contexts/userContext.jsx";
import Audio from "../src/pages/capsules/AudioCapsule/Audio.jsx";
import FinishedAudioCapsule from "../src/pages/capsules/AudioCapsule/FinishedAudioCapsule.jsx";

describe("Audio test", function () {
  it("should render audio component", async function () {
    const user = {
      name: "Hei",
      points: 23,
      finishedCapsules: [],
      intro: true,
      walk: false,
    };

    const audio = [
      {
        category: "Lydkapsel",
        title: "test",
        year: "2000",
        image: "image",
        id: "1",
        song: "songtitle",
      },
    ];

    const context = jest.fn();
    const container = document.createElement("div");

    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <DatabaseContext.Provider value={{ listAudio: () => audio }}>
            <User.Provider value={{ user }}>
              <UserContext.Provider value={{ context }}>
                <Audio />
              </UserContext.Provider>
            </User.Provider>
          </DatabaseContext.Provider>
        </MemoryRouter>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });

  it("should render FinishedAudioCapsule", function () {
    const container = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FinishedAudioCapsule />
      </MemoryRouter>,
      container
    );
    expect(container).toMatchSnapshot();
  });
});
