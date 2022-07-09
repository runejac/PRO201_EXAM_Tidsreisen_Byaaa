import React, { useState, useContext, useEffect } from "react";
import Play from "./Play";
import FinishedAudioCapsule from "./FinishedAudioCapsule.jsx";
import { useLoading } from "../../../helpers/useLoading";
import { DatabaseContext } from "../../../contexts/databaseContext";
import { useParams } from "react-router-dom";
import { User } from "../../../application.jsx";
import { NotLoggedIn } from "../../../components/NotLoggedIn.jsx";
import { UserContext } from "../../../contexts/userContext.jsx";
import { AiFillSound } from "react-icons/ai";
import { Loading } from "../../../components/Loading";
import "../../../css/sound.css";
import Notes from "./Notes";

const Audio = () => {
  const { id } = useParams();
  const [drag, setDrag] = useState();
  const [count, setCount] = useState(0);
  const { updateUser } = useContext(UserContext);
  const { user, setUser } = useContext(User);
  const { name } = user;
  const { listAudio } = useContext(DatabaseContext);
  const { data, loading } = useLoading(async () => await listAudio());
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null,
  });

  // updates correct user only, and only if count is more than 0
  useEffect(() => {
    if (count > 0) {
      return () => {
        if (!user.finishedCapsules.includes(capsuleObject)) {
          user.finishedCapsules.push(capsuleObject);
          user.points = user.points + 20;

          setUser({
            ...user,
          });
        }
      };
    }
  }, [count]);

  // updates user with capsuleObject and points
  const updateToDatabase = async () => {
    setCount(count + 1);
    await updateUser({
      user,
      finishedCapsules: capsuleObject,
      points: 20,
    });
  };
  // If the site is loading, we're setting the loading screen
  if (loading) {
    return <Loading />;
  }

  // If name is undefiend we're showing the not logged in screen
  if (name === undefined) {
    return <NotLoggedIn />;
  }

  // Filtering out right data for the capsuleObject
  const getId = data
    ?.map((id) => id)
    .filter((item) => item.title.toLowerCase() === id?.toLowerCase())
    .map((itemId) => itemId.id);

  // setting capsule object to be inserted in database
  const capsuleObject = {
    id: getId.toString(),
    name: id,
    category: "Lydkapsel",
  };

  // checks capsule id from database
  const capsuleNameFromDatabase = user.finishedCapsules.map((capsuleName) => {
    return capsuleName.name;
  });

  // finds capsule id matches to check whether if user has done it or not
  const filteredCapsuleNamesFromUserDatabase = capsuleNameFromDatabase.find(
    (capsuleName) => {
      console.log(capsuleName);
      return capsuleName === id;
    }
  );
  return (
    <>
      {songInfo.duration === songInfo.currentTime ? (
        <FinishedAudioCapsule
          filteredCapsule={filteredCapsuleNamesFromUserDatabase}
          update={updateToDatabase}
        />
      ) : (
        <div className="position-relative d-flex justify-content-center align-items-center flex-column vh-100 bg-capsule media">
          <Notes />
          {data?.map((item, index) => {
            return (
              <div key={index}>
                {item.title.toLowerCase() === id?.toLowerCase() && (
                  <div className="position-relative d-flex justify-content-center align-items-center flex-column ">
                    <h3 className="pb-3 d-flex align-items-center title">
                      <AiFillSound color={"var(--textColorGray)"} />{" "}
                      {item.category}
                    </h3>
                    <h1 className="pb-3 fw-bolder text-capsule subtitle">
                      {item.title}
                    </h1>
                    <img
                      className="p-2 img"
                      src={item.image}
                      alt={item.image}
                    />

                    <Play
                      song={item.song}
                      songInfo={songInfo}
                      setSongInfo={setSongInfo}
                      setDrag={setDrag}
                    />
                    <h4 className="my-5 fw-bold year">År {item.year}</h4>
                    {filteredCapsuleNamesFromUserDatabase ? (
                      <p className="fst-italic fw-bold undertext">
                        Denne lydkapselen er lyttet ferdig
                      </p>
                    ) : (
                      <p className="fst-italic fw-bold undertext">
                        Lytt ferdig lydkapselen for å få poeng
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Audio;
