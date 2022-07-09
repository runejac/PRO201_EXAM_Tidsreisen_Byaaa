import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../css/cameraBackButton.css";

export default function Camera() {
  const [isScanned, setIsScanned] = useState(false);
  const [data, setData] = useState(null);
  let navigate = useNavigate();
  const videoRef = useRef();
  let qrScanner = null;

  useEffect(() => {
    const videoElem = videoRef.current;

    qrScanner = new QrScanner(
      videoElem,
      (qrcode) => {
        if (qrcode) {
          setIsScanned(!isScanned);
          setData(qrcode.data);
        }
      },
      {
        onDecodeError: (error) => {},
        highlightScanRegion: true,
        maxScansPerSecond: 3,
      }
    );
    qrScanner.start();
    const device_height = window.screen.height;
    const device_width = window.screen.width;

    // set height and width of video
    document.getElementById("qr-video").style.width = device_width + "px";
    document.getElementById("qr-video").style.height = device_height + "px";

    data
      ? (navigate(data, { replace: true }), qrScanner.destroy())
      : console.log(data);

    return () => qrScanner.destroy();
  }, [data]);

  useEffect(() => {
    // need to manually hide scan region after result

    isScanned
      ? ((document.getElementsByClassName(
          "scan-region-highlight-svg"
        )[0].style.display = "none"),
        (document.getElementsByClassName(
          "scan-region-highlight"
        )[0].style.display = "none"))
      : console.log("Nothing scanned yet");

    return () => {
      setIsScanned(false);
    };
  }, [isScanned]);

  return (
    <>
      <div id={"camera-back-button-container"}>
        <IoIosArrowBack
          variant="white"
          onClick={() => navigate("/map")}
          size={35}
        />
      </div>
      <video
        style={{
          backgroundColor: "black",
          position: "a",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        id="qr-video"
        ref={videoRef}
      />
    </>
  );
}
