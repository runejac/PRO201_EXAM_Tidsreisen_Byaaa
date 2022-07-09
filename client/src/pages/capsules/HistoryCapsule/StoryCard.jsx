import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/Loading.jsx";
// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

// modules styles
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import SwiperCore from "swiper";
import { useParams } from "react-router-dom";
import "./storycard.css";
import { UserContext } from "../../../contexts/userContext.jsx";
import { HistoryDone } from "./HistoryDone.jsx";
import { User } from "../../../application.jsx";
import { ErrorModal } from "../../../components/ErrorModal.jsx";
import { FaBook } from "react-icons/fa";

export function StoryCard({ historyCapsule, error, loading }) {
  SwiperCore.use([Scrollbar]);

  const { id } = useParams();
  const { updateUser } = useContext(UserContext);
  const { user, setUser } = useContext(User);
  const { name, intro, walk, points } = user;
  const [count, setCount] = useState(0);
  let previousState = { ...user };

  // setting capsule object to be inserted in database
  const capsuleObject = {
    id: historyCapsule.id,
    name: historyCapsule.name,
    category: historyCapsule.category,
  };

  // updates user with capsuleObject and points
  const updateToDatabase = async () => {
    setCount(count + 1);
    await updateUser({
      user,
      finishedCapsules: capsuleObject,
      points: 20,
    });
  };

  // updates correct user only, and only if count is more than 0
  // counts when swiping
  useEffect(() => {
    if (count > 0) {
      return () => {
        if (!user.finishedCapsules.includes(capsuleObject)) {
          user.finishedCapsules.push(capsuleObject);
          user.points = user.points + 20;
          setUser({
            ...previousState,
          });
        }
      };
    }
  }, [count]);

  // showing correct history capsule according to what the url parameter is
  if (historyCapsule.name.toLowerCase() === id?.toLowerCase()) {
    return (
      <div>
        <div className={"p-4"} style={{ position: "relative", zIndex: "0" }}>
          <div style={{ position: "relative" }}>
            <h3 id={"capsule-name"} className={"text-center"}>
              <FaBook color={"var(--textColorGray)"} /> Historiekapsel
            </h3>
            <h1
              className={"text-center"}
              style={{
                color: "var(--backgroundColorGreeny)",
                fontFamily: "Source Sans Pro Bold",
              }}
            >
              {historyCapsule.name}
            </h1>
          </div>
          <Swiper
            centeredSlides={true}
            spaceBetween={50}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            onReachEnd={async () => await updateToDatabase()}
          >
            {historyCapsule.story.map((capsuleStory, index) => {
              return (
                <SwiperSlide key={index} className={"slide"}>
                  {capsuleStory.done === true ? (
                    <HistoryDone
                      updateToDatabase={updateToDatabase}
                      id={historyCapsule.id}
                    />
                  ) : (
                    <div className={"swiper-slide"} key={index}>
                      <div className={"slide-content"}>
                        <div id={"slide-container"}>
                          <div
                            /*style={{ maxWidth: "45rem" }}*/
                            className={"mt-5 image-container"}
                          >
                            {capsuleStory.image && (
                              <section id={"image-section"}>
                                <img
                                  id={"history-image"}
                                  className={"card-img"}
                                  src={capsuleStory.image}
                                  alt={"bilde av historie-element"}
                                />
                              </section>
                            )}
                          </div>

                          <section id={"story-section"} className={"mt-4"}>
                            <p id={"story-paragraph"}>{capsuleStory.story}</p>
                          </section>
                        </div>
                      </div>
                      <div id={"year"}>
                        <h4 className=" fw-bold">{capsuleStory.year}</h4>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  }
  return (
    <>
      {loading && <Loading />}
      {error && <ErrorModal error={error} />}
    </>
  );
}
