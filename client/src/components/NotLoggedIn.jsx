import React from "react";
import { Modal } from "react-bootstrap";
import { CapsuleButtonYellow } from "./CapsuleButton.jsx";
import { useNavigate } from "react-router-dom";

export function NotLoggedIn() {
  const navigate = useNavigate();

  return (
    <Modal
      className={"d-flex justify-content-center align-items-center"}
      show={true}
    >
      <Modal.Body>
        Woops! Det ser ut som du ikke er inne med et brukernavn, for at
        Tidsreisen skal fungere som den skal må du legge inn et brukernavn.
        Klikk på "Logg inn" for å gjøre det.
      </Modal.Body>
      <Modal.Footer className={"d-flex justify-content-center my-modal"}>
        <CapsuleButtonYellow
          data-testid="backBtn"
          className={"justify-content-center align-content-center"}
          buttonText={"Logg inn"}
          onClick={() => navigate("/")}
        />
      </Modal.Footer>
    </Modal>
  );
}
