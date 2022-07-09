import React from "react";
import sound from "../assets/images/mapbox-images/Lyd.png";
import book from "../assets/images/mapbox-images/Historie.png";
import quiz from "../assets/images/mapbox-images/Quiz.png";
import one from "../assets/images/mapbox-images/1.png";
import two from "../assets/images/mapbox-images/2.png";
import three from "../assets/images/mapbox-images/3.png";
import four from "../assets/images/mapbox-images/4.png";
import five from "../assets/images/mapbox-images/5.png";
import six from "../assets/images/mapbox-images/6.png";
import seven from "../assets/images/mapbox-images/7.png";
import eight from "../assets/images/mapbox-images/8.png";
import nine from "../assets/images/mapbox-images/9.png";
import vesledammen from "../assets/images/mapbox-images/Velsedammen-korr.jpg";
import sagbrukQuiz from "../assets/images/mapbox-images/12322-korr.jpg";
import sagbrukHistorie from "../assets/images/mapbox-images/22183-korr-korr.jpg";
import hulveiQuiz from "../assets/images/mapbox-images/22183-kopi-korr.jpg";
import hulveiLyd from "../assets/images/mapbox-images/80278-korr.jpg";
import kvernhusHistorie from "../assets/images/mapbox-images/267472-korr.jpg";
import vegfarLyd from "../assets/images/mapbox-images/267498-kopi-korr.jpg";
import kvernhusQuiz from "../assets/images/mapbox-images/267603-korr.jpg";
import sagtuftHistorie from "../assets/images/mapbox-images/267607-korr.jpg";

const GeoJson = () => {
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.099034, 59.851039],
        },
        properties: {
          id: 1,
          anim_coords: [11.098702973978902, 59.8507382930932],
          anim_bearing: 48.61187117432837,
          anim_pitch: 64.92350884432173,
          anim_zoom: 17.103487802610875,
          title: "Vesledammen",
          url: "/audio/vesledammen",
          image: vesledammen,
          icon: one,
          found_icon: sound,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.101616, 59.851307],
        },
        properties: {
          id: 2,
          anim_coords: [11.101387317873332, 59.851518394786524],
          anim_bearing: 9.636879514723432,
          anim_pitch: 61.010279154422896,
          anim_zoom: 16.929861666765753,
          title: "Kvernhus",
          url: "/history/kvernhus",
          image: kvernhusHistorie,
          icon: two,
          found_icon: book,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.100541, 59.8528],
        },
        properties: {
          id: 3,
          anim_coords: [11.103211437406003, 59.853419234186646],
          anim_bearing: 75.88975953652334,
          anim_pitch: 62.99999999999999,
          anim_zoom: 15.669844196015042,
          title: "Kvernhus",
          url: "/quiz/kvernhus",
          image: kvernhusQuiz,
          icon: three,
          found_icon: quiz,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.10087238, 59.85371299],
        },
        properties: {
          id: 4,
          anim_coords: [11.10104521138237, 59.8535153775193],
          anim_bearing: 19.430682367115196,
          anim_pitch: 57.388262687131885,
          anim_zoom: 17.274696427680226,
          title: "Vegfar",
          url: "/audio/vegfar",
          image: vegfarLyd,
          icon: four,
          found_icon: sound,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.102064, 59.853905],
        },
        properties: {
          id: 5,
          anim_coords: [11.102607250590609, 59.85425132545012],
          anim_bearing: 107.00878915905628,
          anim_pitch: 55.499999999999886,
          anim_zoom: 15.562401285283801,
          title: "Sagtuft",
          url: "/history/sagtuft",
          image: sagtuftHistorie,
          icon: five,
          found_icon: book,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.10772289, 59.85438232],
        },
        properties: {
          id: 6,
          anim_coords: [11.108629672508187, 59.854432565370274],
          anim_bearing: 116.73162097340128,
          anim_pitch: 55.500000000000114,
          anim_zoom: 16.069917476618837,
          title: "Sagbruk",
          url: "/quiz/sagbruk",
          image: sagbrukQuiz,
          icon: six,
          found_icon: quiz,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.11190333, 59.85439546],
        },
        properties: {
          id: 7,
          anim_coords: [11.112599067786391, 59.85434903897587],
          anim_bearing: 116.80913303728971,
          anim_pitch: 36.999999999999964,
          anim_zoom: 16.575027578261583,
          title: "Vannsag",
          url: "/audio/vannsag",
          image: hulveiLyd,
          icon: seven,
          found_icon: sound,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.114554, 59.85441],
        },
        properties: {
          id: 8,
          anim_coords: [11.115161247312585, 59.854002695525566],
          anim_bearing: 148.74383310113717,
          anim_pitch: 66.37370343899913,
          anim_zoom: 16.48887756215476,
          title: "Sagbruk",
          image: sagbrukHistorie,
          icon: eight,
          found_icon: book,
          url: "/history/sagbruk",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [11.11492068, 59.85452141],
        },
        properties: {
          id: 9,
          anim_coords: [11.113652736346012, 59.85271487234067],
          anim_bearing: -83.49755226625172,
          anim_pitch: 50.730842164066615,
          anim_zoom: 14.961133136131712,
          title: "Hulvei",
          url: "/quiz/hulvei",
          image: hulveiQuiz,
          icon: nine,
          found_icon: quiz,
        },
      },
    ],
  };

  return geojson;
};
export default GeoJson;
