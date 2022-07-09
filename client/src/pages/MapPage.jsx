import "mapbox-gl/dist/mapbox-gl.css";

import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "../css/Maps.css";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoJson from "../helpers/MapHelpers.js";
import AnimatedPopup from "mapbox-gl-animated-popup";
import Popup from "../components/Popup.jsx";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { User } from "../application.jsx";
import { postJSON } from "../helpers/http.jsx";
import { MapContext } from "../application.jsx";
import { myFindingsCardData } from "../components/myFindingsCardData.jsx";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFua25pOTUiLCJhIjoiY2t3cmE0OXlsMGQ3bzMxbHNjMm82bDkzeCJ9.1XATyS82VYWyaSB5NQ3j9g";

export function MapPage() {
  const mapContainerRef = useRef(null);
  const { setMap, map } = useContext(MapContext);
  let navigate = useNavigate();

  const { user, setUser } = useContext(User);
  const { name, intro, walk } = user;
  let previousState = { ...user };

  async function handleWalkClick() {
    async function handleToPositionChange(walk) {
      if (!walk) {
        document.getElementsByClassName("mapboxgl-ctrl-icon")[0].click();
        previousState.walk = false;
        setUser({ ...previousState });
        await postJSON("/api/update-state", { user: name, walk: false });
        forceRepaintPopups(false);
        map.flyTo({
          center: [11.100389206568366, 59.851476403479325],
          zoom: 15.042403483653505,
          bearing: 32.608789159055505,
          pitch: 36.99999999999998,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        });
      }

      if (walk) {
        await postJSON("/api/update-state", { user: name, walk: true });
        previousState.walk = true;
        setUser({ ...previousState });
        forceRepaintPopups(true);
        document.getElementsByClassName("mapboxgl-ctrl-icon")[0].click();
      }
    }

    !walk
      ? await handleToPositionChange(true)
      : await handleToPositionChange(false);
  }

  useEffect(() => {
    if (!walk)
      document.getElementById("nav-text-qr").style.visibility = "hidden";

    const initializeMap = ({ setMap, mapContainerRef }) => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/dankni95/ckwrbx1et77jt14o2o3jtrbui",
        center: [11.100389206568366, 59.851476403479325],
        pitch: 36.99999999999998,
        bearing: 32.608789159055505,
        zoom: 15.042403483653505,
      });

      // Initialize the geolocate control.
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      map.addControl(geolocate);

      map.on("load", () => {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [11.099034, 59.851039],
                [11.101616, 59.851307],
                [11.100541, 59.8528],
                [11.10087238, 59.85371299],
                [11.102064, 59.853905],
                [11.107697, 59.854386],
                [11.110563, 59.854391],
                [11.114554, 59.85441],
                [11.11492068, 59.85452141],
              ],
            },
          },
        });
        const layer = map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#AF4879",
            "line-width": 8,
          },
        });
      });
      setMap(map);
    };

    if (!map) initializeMap({ setMap, mapContainerRef });
    map ? (walk ? forceRepaintPopups(true) : forceRepaintPopups(false)) : "";
  }, [map, setMap, user]);

  function anim(target) {
    map.flyTo({
      center: target.anim_coords,
      zoom: target.anim_zoom,
      bearing: target.anim_bearing,
      pitch: target.anim_pitch,
      speed: 2,
      curve: 2,
      easing: (t) => t,
      essential: true,
    });
  }

  let matchesArr = [];

  function forceRepaintPopups(repaint) {
    const mappedFromDummy = myFindingsCardData.finishedCapsules.map(
      (item) => item.id
    );

    const mappedFromDb = user.finishedCapsules?.map((dbName) => dbName.id);

    mappedFromDb?.forEach((capsuleFromDb) => {
      mappedFromDummy.forEach((capsuleFromDummy) => {
        if (capsuleFromDummy === capsuleFromDb) {
          matchesArr.push(capsuleFromDummy);
        }
      });
    });

    const popupDiv = document.getElementById("mapboxgl-popup-content");
    popupDiv ? popupDiv.remove() : "";

    for (const feature of GeoJson().features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";
      el.id = "popups";
      el.addEventListener("click", () => anim(feature.properties), false);

      // check if capsule already done
      matchesArr.includes(feature.properties.id.toString())
        ? ((el.style.backgroundImage = `url(${feature.properties.found_icon})`),
          (el.style.backgroundSize = "30px 30px"))
        : (el.style.backgroundImage = `url(${feature.properties.icon})`);

      let popup = new AnimatedPopup({
        offset: 25,
        openingAnimation: {
          duration: 200,
          easing: "linear",
          transform: "scale",
        },
        closingAnimation: {
          duration: 200,
          easing: "easeInBack",
          transform: "scale",
        },
      });

      let display;
      repaint ? (display = "none") : (display = "inline-block");

      const placeholder = document.createElement("div");
      const div = document.createElement("div");
      div.innerHTML = `<div>
              <h3>${feature.properties.title}</h3>
              <div><img src="${feature.properties.image}" style="height: 200px; width: 200px;" alt="popup image"/></div>
              <br>
              </div>`;
      placeholder.appendChild(div);

      const button = document.createElement("button");
      button.innerText = "Til kapsel";
      button.id = "to-capsule";
      button.className = "capsule-btn";
      button.style = `display:${display}`;

      button.addEventListener(
        "click",
        () => navigate(feature.properties.url),
        false
      );

      placeholder.appendChild(button);

      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          popup.setDOMContent(placeholder) // add popups
        )
        .addTo(map);
    }
  }

  useEffect(() => {
    map ? document.getElementById("map").replaceWith(map.getContainer()) : "";
    map ? map.resize() : "";

    if (walk) {
      document.getElementById("nav-text-qr").style.visibility = "visible";
    } else document.getElementById("nav-text-qr").style.visibility = "hidden";
  }, [walk]);

  return (
    <>
      <div id={"map-container"}>
        <div
          id={"map"}
          className="map-container"
          ref={(el) => (mapContainerRef.current = el)}
        />
      </div>
      <Form id="custom-switch">
        <div className="me-1">
          <p style={{ margin: 0, fontWeight: "bold" }}>På stien</p>
        </div>
        <Form.Check
          className="ms-1"
          defaultChecked={walk}
          type="switch"
          onClick={() => {
            handleWalkClick().then(() => {});
          }}
        />
      </Form>
      {intro ? <Popup key={name} /> : ""}
    </>
  );
}
