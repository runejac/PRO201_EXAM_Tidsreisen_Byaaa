import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CapsuleButtonGreen } from "./CapsuleButton.jsx";
import { BsArrowRight } from "react-icons/bs";
import "../css/popup.css";
import olaf from "../assets/images/olaf-infront-intro.png";
import { postJSON } from "../helpers/http.jsx";
import { User } from "../application.jsx";

export default function Popup() {
  const { user, setUser } = useContext(User);
  const { name, intro } = user;
  const [show, setShow] = useState(true);

  const [message, setMessage] = useState(() => {
    return (
      <div style={{ marginTop: "1rem" }}>
        Trykk på <BsArrowRight /> for å lære litt om appen
      </div>
    );
  });

  const messages = [
    {
      id: 1,
      content: (
        <p className={"intro-content"}>
          <span style={{ fontWeight: "bold" }}>
            Heisann {name}, jeg heter Olaf! <br />
          </span>
          Jeg jobber som sagdreng her på Byåa. Bli med meg på denne tidsreisen!
        </p>
      ),
    },
    {
      id: 2,
      content: (
        <p className={"intro-content"}>
          Reisen begynner på kapsel nummer 1 på kartet. Bruk bryteren som er
          øverst til høyre for å velge om du skal bruke appen på skolen, eller
          på stien. Klikk på kartet, eller på QR-scan ikonet som du finner på
          midten i menyen.
        </p>
      ),
    },
    {
      id: 3,
      content: (
        <p className={"intro-content"}>
          Jeg har gjemt forskjellige tidskapsler. Beveg deg videre på
          kulturstien, og reis tilbake i tid med meg.
          <br />
          I tillegg får du poeng for hver tidskapsel du fullfører. Håper du
          finner dem alle.
          <br />
          Husk å ha det gøy og lykke til {name}!
        </p>
      ),
    },
  ];

  const [next, setNext] = useState(1);

  async function changeTitle(id) {
    if (id > 3) await handleClose();

    messages.map((modalMessage) => {
      if (modalMessage.id === id) {
        setMessage(modalMessage.content);
      }
    });
  }

  let previousState = { ...user };

  const handleClose = async () => {
    await postJSON("/api/update-state", {
      user: name,
      intro: false,
    });
    setShow(false);

    previousState.intro = false;
    setUser({ ...previousState });
  };

  const handleNext = () => setNext(next + 1);
  const handleShow = () => setShow(true);

  if (intro) window.addEventListener("load", handleShow);

  return (
    <section className={"rounded"}>
      {name && (
        <Modal
          dialogClassName={"border-radius-2"}
          className={"d-flex justify-content-center align-items-center"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Body id={"modal-body"}>
            <div id={"modal-title"}>
              <h1 id={"title"}>Velkommen til Tidsreisen!</h1>
            </div>

            <div id={"image-and-message-container"}>
              <img
                width={200}
                id={"olaf-image"}
                src={olaf}
                alt="bilde av intro-olaf"
              />
              <span>{message}</span>
            </div>

            <div id={"bottom-container"}>
              <div className={"d-flex flex-column"}>
                {next > 3 && (
                  <CapsuleButtonGreen
                    className={"justify-content-center align-content-center"}
                    buttonText={"Start reisen!"}
                    onClick={handleClose}
                  />
                )}
              </div>
              {3 >= next ? (
                <BsArrowRight
                  style={{
                    fontSize: "2.5rem",
                    color: "var(--backgroundColorGreeny)",
                  }}
                  onClick={() => {
                    handleNext();
                    changeTitle(next);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </section>
  );
}
