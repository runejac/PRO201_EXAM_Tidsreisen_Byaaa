import React from "react";
import { Modal } from "react-bootstrap";
import { CapsuleButtonYellow } from "./CapsuleButton.jsx";
import { useNavigate } from "react-router-dom";
import "../css/notFound.css";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div id={"background-modal-notfound"}>
      <Modal
        className={"d-flex justify-content-center align-items-center"}
        show={true}
      >
        <Modal.Header className={"my-modal"}>
          <Modal.Title style={{ fontFamily: "Bubblegum Sans" }}>
            404_
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Uh oh... Vi kan ikke finne det du leter etter.</Modal.Body>
        <Modal.Footer className={"d-flex justify-content-center my-modal"}>
          <CapsuleButtonYellow
            className={"justify-content-center align-content-center"}
            buttonText={"Tilbake til startsiden"}
            onClick={() => navigate("/")}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
