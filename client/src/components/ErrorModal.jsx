import React from "react";
import { Modal } from "react-bootstrap";
import { CapsuleButtonYellow } from "./CapsuleButton.jsx";

export function ErrorModal({ error }) {
  return (
    <Modal
      className={"d-flex justify-content-center align-items-center"}
      show={true}
    >
      <Modal.Body>
        Woops! Det ser ut som det skjedde en feil, forsøk å klikk på "Last inn"
        eller lukk appen og start den på nytt. <br /> Teknisk melding: {error}
      </Modal.Body>
      <Modal.Footer className={"d-flex justify-content-center my-modal"}>
        <CapsuleButtonYellow
          className={"justify-content-center align-content-center"}
          buttonText={"Last inn"}
          onClick={() => window.location.reload()}
        />
      </Modal.Footer>
    </Modal>
  );
}
