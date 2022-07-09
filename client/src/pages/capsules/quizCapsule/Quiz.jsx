import React from "react";
import "./quiz.css";
import { useLoading } from "../../../helpers/useLoading.jsx";
import { DatabaseContext } from "../../../contexts/databaseContext.jsx";
import { UserContext } from "../../../contexts/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { CapsuleButtonGreen } from "../../../components/CapsuleButton.jsx";
import { NotLoggedIn } from "../../../components/NotLoggedIn.jsx";
import { User } from "../../../application.jsx";
import { MdQuiz } from "react-icons/md";
import { Loading } from "../../../components/Loading.jsx";
import olafInfront from "../../../assets/images/olaf-infront.png";

export function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();

  const { listQuiz } = useContext(DatabaseContext);
  const { updateUser } = useContext(UserContext);
  const { user, setUser } = useContext(User);
  const { name, intro, walk, points: prevPoints, finishedCapsules } = user;

  let capsuleObject = {};

  const { loading, error, data } = useLoading(
    async () => await listQuiz({ id }),
    [id]
  );

  // updates correct user only, and only if showPoints is true
  useEffect(async () => {
    if (showPoints) {
      await updateUser({ points, user, finishedCapsules: capsuleObject });

      if (!user.finishedCapsules.includes(capsuleObject)) {
        user.finishedCapsules.push(capsuleObject);
        user.points = user.points + points;
        setUser({
          ...user,
        });
      }
    }
  }, [showPoints, updateUser]);

  if (loading) {
    return <Loading />;
  }

  if (!name) {
    return <NotLoggedIn />;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  console.log(data[currentQuestion].id);

  // setting capsule object to be inserted in database
  capsuleObject = {
    id: data[currentQuestion].id,
    name: data[currentQuestion].name_,
    category: data[currentQuestion].category,
  };

  // checks capsule id from database
  const capsuleNameFromDatabase = user.finishedCapsules.map((capsuleName) => {
    return capsuleName.id;
  });

  // finds capsule id matches to check whether user has done it or not
  const filteredCapsuleNamesFromUserDatabase = capsuleNameFromDatabase.find(
    (capsuleName) => {
      return capsuleName === data[currentQuestion].id;
    }
  );

  function incPoints() {
    setPoints((state) => {
      return state + 10;
    });
  }

  function incScore() {
    setScore((state) => {
      return state + 1;
    });
  }

  function handleAnswerClick(isCorrect) {
    setIndex(index + 1);
    if (isCorrect) {
      incPoints();
      incScore();
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
      console.log(capsuleNameFromDatabase);
    } else if (
      filteredCapsuleNamesFromUserDatabase === data[currentQuestion].id
    ) {
      console.log(alreadyDone);
      setAlreadyDone(true);
      console.log(alreadyDone);
    } else {
      setShowPoints(true);
    }
  }

  return (
    <main className="quiz" style={{ display: "grid", placeItems: "center" }}>
      {showPoints ? (
        <div>
          <div className={"d-flex justify-content-center mb-5"}>
            <h1 id={"done-title"}>Fullført quizkapselen!</h1>
          </div>
          <div
            id={"olaf-infront-div"}
            className={
              "d-flex flex-column align-content-center flex-row justify-content-center gap-3  position-relative z-index-1"
            }
          >
            <div className="d-flex">
              <div>
                <img
                  id={"olof-infront"}
                  height={200}
                  src={olafInfront}
                  alt="bilde av olaf på fullført side"
                />
              </div>

              <div className="pe-4">
                <div className="left-point"></div>

                <p id={"finish-paragraph"}>
                  Godt jobbet!{" "}
                  <span className="score">
                    {score}/{data?.length} riktige
                  </span>{" "}
                  <br />
                  Du har gjennomført en kapsel og fått poeng for det, og kanskje
                  til og med lært noe nytt om Byåa!
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                Du har fått + {points} poeng
              </p>
            </div>
          </div>
          <div className={"links mt-5"}>
            <CapsuleButtonGreen
              buttonText={"Tilbake til kart"}
              onClick={() => navigate("/map")}
            />
            <CapsuleButtonGreen
              buttonText={"Mine funn"}
              onClick={() => navigate("/myfindings")}
            />
          </div>
        </div>
      ) : alreadyDone ? (
        <div>
          <div className={"d-flex justify-content-center mb-5"}>
            <h1 id={"done-title"}>Fullført quizkapselen! </h1>
          </div>
          <div className="d-flex">
            <div>
              <img
                id={"olof-infront"}
                height={200}
                /*className={"img-fluid"}*/ src={olafInfront}
                alt="bilde av olaf på fullført side"
              />
            </div>

            <div className="pe-4">
              <p id={"finish-paragraph"}>
                Woops! Det ser ut som du allerede har vært på denne kapselen. Gå
                til neste kapsel.
              </p>
            </div>
          </div>
          <div className={"links  mt-5"}>
            <CapsuleButtonGreen
              buttonText={"Tilbake til kart"}
              onClick={() => navigate("/map")}
            ></CapsuleButtonGreen>
            <CapsuleButtonGreen
              buttonText={"Mine funn"}
              onClick={() => navigate("/myfindings")}
            ></CapsuleButtonGreen>
          </div>
        </div>
      ) : (
        <Container className="quiz-items">
          <div>
            <h3 className="capsule-title">
              <MdQuiz color={"var(--textColorGray)"} /> Quizkapsel
            </h3>
            <h1 className="category">{data[currentQuestion].name_}</h1>
            <p className="questionIndex">
              {index}/{data.length}
            </p>
            <p className="question">{data[currentQuestion].question_}</p>
          </div>

          <div className="button-container">
            {data[currentQuestion].answers.map((a, index) => (
              <div key={index} className={"answer-btn"}>
                <CapsuleButtonGreen
                  onClick={() => handleAnswerClick(a.isCorrect)}
                  buttonText={a.answer}
                />
              </div>
            ))}
          </div>
        </Container>
      )}
    </main>
  );
}
