import React, { useContext, useState } from "react";
import { DatabaseContext } from "../../../contexts/databaseContext.jsx";
import { useLoading } from "../../../helpers/useLoading.jsx";
import { Loading } from "../../../components/Loading.jsx";
import { StoryCard } from "./StoryCard.jsx";
import { NotLoggedIn } from "../../../components/NotLoggedIn.jsx";
import { User } from "../../../application.jsx";
import { ErrorModal } from "../../../components/ErrorModal.jsx";
import sawEffect from "../../../assets/images/saw-effect.png";
import "./storycard.css";
import "../../../css/olaf.css";

export function History() {
  const { user } = useContext(User);
  const { name } = user;

  const [error, setEror] = useState();
  const { listHistory } = useContext(DatabaseContext);
  const {
    data,
    error: errorHistory,
    loading,
  } = useLoading(async () => await listHistory());

  if (loading) {
    return <Loading />;
  }

  if (errorHistory) {
    setEror(errorHistory);
    console.error(error);
    return <ErrorModal error={error} />;
  }

  if (name === undefined) {
    return <NotLoggedIn />;
  }

  return (
    <div
      style={{
        backgroundColor: "#F2F1E8",
        height: "100vh",
      }}
    >
      <img
        id={"image-saw-effect"}
        height={700}
        src={sawEffect}
        alt="bilde av vann sag effekt bakgrunn"
      />
      {data && (
        <div>
          {data?.map((historyCapsule, index) => {
            return (
              <div key={index}>
                <StoryCard
                  loading={loading}
                  error={error}
                  historyCapsule={historyCapsule}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
