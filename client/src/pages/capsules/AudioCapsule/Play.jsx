import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import vegfar from "../../../assets/Sound/vegfar.mp3";
import vesledammen from "../../../assets/Sound/vesledammen.mp3";
import vannsag from "../../../assets/Sound/vannsag.mp3";

// Test audio file for shorter duration
import twoSecSoundFile from "../../../assets/Sound/2-seconds-of-silence.mp3";
import { useParams } from "react-router-dom";
import "../../../css/sound.css";

const Play = ({ songInfo, setSongInfo, setDrag }) => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef(null);

  let audioUrl = "";

  // Check si that the right audio file is playing in the right capsule
  if (id === "vegfar") {
    //audioUrl = vegfar;
    audioUrl = vegfar;
  }
  if (id === "vannsag") {
    //audioUrl = vannsag;
    audioUrl = vannsag;
  }
  if (id === "vesledammen") {
    //audioUrl = vesledammen;
    audioUrl = vesledammen;
  }

  // Setting current time and duration in state
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  // Formatting current time and duration of the audio file
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  // Check if audio file is playing or not
  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      audio.current.pause();
    } else {
      setIsPlaying(!isPlaying);
      audio.current.play();
    }
  };
  // Updates time in realtime, so that the input range is changing according to audio's current time
  const onDragHandler = (e) => {
    setDrag(e.target.value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center ">
        <p className="m-0 ">{getTime(songInfo.currentTime)}</p>
        <input
          onChange={onDragHandler}
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          className="mx-2 form-range media-input"
          type="range"
        />
        <p className="m-0 ">{getTime(songInfo.duration)}</p>
      </div>
      <div className="mt-2">
        {isPlaying ? (
          <FaPause className="icon" onClick={handlePlay} size={25} />
        ) : (
          <FaPlay className="icon" onClick={handlePlay} size={25} />
        )}
      </div>

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audio}
        src={audioUrl}
      ></audio>
    </div>
  );
};

export default Play;
