import React, { useContext } from "react";
import olafInfront from "../../../assets/images/olaf-infront.png";
import { CapsuleButtonGreen } from "../../../components/CapsuleButton.jsx";
import { useNavigate } from "react-router-dom";
import { User } from "../../../application.jsx";

export function HistoryDone({ id, updateToDatabase }) {
  const navigate = useNavigate();
  const { user } = useContext(User);

  const navigateToMap = () => navigate("/map");
  const navigateToMyFindings = () => {
    updateToDatabase();
    navigate("/myfindings");
  };

  // checks capsule id from database
  const capsuleNameFromDatabase = user.finishedCapsules.map((capsuleName) => {
    return capsuleName.id;
  });

  // finds capsule id matches to check whether if user has done it or not
  const filteredCapsuleNamesFromUserDatabase = capsuleNameFromDatabase.find(
    (capsuleName) => {
      return capsuleName === id;
    }
  );

  return (
    <div id={"done-container"}>
      <div className={"d-flex justify-content-center mt-3"}>
        <h1 id={"done-title"}>Fullført historiekapselen!</h1>
      </div>
      <div
        id={"olaf-infront-div"}
        className={
          "w-100 h-50 d-flex align-content-center flex-row justify-content-center gap-3"
        }
      >
        <div style={{ marginTop: "3rem" }}>
          <img
            id={"olaf-infront-img"}
            height={200}
            src={olafInfront}
            alt="bilde av olaf på fullført side"
          />
        </div>

        <div
          id={"done-text"}
          style={{ marginTop: "2rem" }}
          className={"flex-shrink-1"}
        >
          {id === filteredCapsuleNamesFromUserDatabase ? (
            <p id={"finish-paragraph"}>
              Woops! Det ser ut som du allerede har vært på denne kapselen. Gå
              til neste kapsel.
            </p>
          ) : (
            <p id={"finish-paragraph"}>
              Godt jobbet!
              <br /> Du har gjennomført en kapsel og fått poeng for det, og
              kanskje til og med lært noe nytt om Byåa!
            </p>
          )}
        </div>
      </div>
      <div
        id={"points-and-buttons-container"}
        className={
          "d-flex justify-content-center flex-column align-items-center"
        }
      >
        <div className={"mb-5"}>
          {id === filteredCapsuleNamesFromUserDatabase ? null : (
            <p id={"history-points"}>Du har fått + 20 poeng</p>
          )}
        </div>
        <div className={"d-flex flex-column"}>
          <div>
            <CapsuleButtonGreen
              onClick={navigateToMap}
              buttonText={"Tilbake til kart"}
            />
          </div>
          <div>
            <CapsuleButtonGreen
              onClick={navigateToMyFindings}
              buttonText={"Mine funn"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
