import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import olafInfront from "../../../assets/images/olaf-infront.png";
import "../../../css/olaf.css";
import { CapsuleButtonGreen } from "../../../components/CapsuleButton.jsx";
import Notes from "./Notes";

const FinishedAudioCapsule = ({ update, filteredCapsule }) => {
  const navigate = useNavigate();

  // Updates database when hitting this component
  useEffect(async () => {
    await update();
  }, []);

  const navigateToMap = () => navigate("/map");
  const navigateToMyFindings = () => {
    navigate("/myfindings");
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-capsule">
      <Notes />
      <div className={"d-flex justify-content-center mb-5"}>
        <h1 id={"done-title"}>Fullført lydkapselen!</h1>
      </div>
      <div
        id={"olaf-infront-div"}
        className={
          "d-flex align-content-center flex-row justify-content-center gap-3  position-relative z-index-1"
        }
      >
        <div>
          <img
            id={"olof-infront"}
            height={200}
            /*className={"img-fluid"}*/ src={olafInfront}
            alt="bilde av olaf på fullført side"
          />
        </div>

        <div className="pe-4">
          <div className="left-point"></div>
          {filteredCapsule ? (
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
      {filteredCapsule ? (
        <div>
          <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}></p>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
            Du har fått + 20 poeng
          </p>
        </div>
      )}

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
  );
};

export default FinishedAudioCapsule;
