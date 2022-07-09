import vesledammen from "../assets/images/mapbox-images/Velsedammen-korr.jpg";
import sagbrukQuiz from "../assets/images/mapbox-images/12322-korr.jpg";
import sagbrukHistorie from "../assets/images/mapbox-images/22183-korr-korr.jpg";
import hulveiQuiz from "../assets/images/mapbox-images/22183-kopi-korr.jpg";
import hulveiLyd from "../assets/images/mapbox-images/80278-korr.jpg";
import kvernhusHistorie from "../assets/images/mapbox-images/267472-korr.jpg";
import vegfarLyd from "../assets/images/mapbox-images/267498-kopi-korr.jpg";
import kvernhusQuiz from "../assets/images/mapbox-images/267603-korr.jpg";
import sagtuftHistorie from "../assets/images/mapbox-images/267607-korr.jpg";

// for use in MyFindingsCard and MyFindingsSingle, to list all the available capsules
export const myFindingsCardData = {
  finishedCapsules: [
    {
      id: "1",
      name: "Vesledammen",
      category: "Lydkapsel",
      url: "/audio/vesledammen",
      image: vesledammen,
    },
    {
      id: "2",
      name: "Kvernhus",
      category: "Historiekapsel",
      url: "/history/kvernhus",
      image: kvernhusHistorie,
    },
    {
      id: "3",
      name: "Kvernhus",
      category: "Quizkapsel",
      url: "/quiz/kvernhus",
      image: kvernhusQuiz,
    },
    {
      id: "4",
      name: "Vegfar",
      category: "Lydkapsel",
      url: "/audio/vegfar",
      image: vegfarLyd,
    },
    {
      id: "5",
      name: "Sagtuft",
      category: "Historiekapsel",
      url: "/history/sagtuft",
      image: sagtuftHistorie,
    },
    {
      id: "6",
      name: "Sagbruk",
      category: "Quizkapsel",
      url: "/quiz/sagbruk",
      image: sagbrukQuiz,
    },
    {
      id: "7",
      name: "Vannsag",
      category: "Lydkapsel",
      url: "/audio/vannsag",
      image: hulveiLyd,
    },
    {
      id: "8",
      name: "Sagbruk",
      category: "Historiekapsel",
      url: "/history/sagbruk",
      image: sagbrukHistorie,
    },
    {
      id: "9",
      name: "Hulvei",
      category: "Quizkapsel",
      url: "/quiz/hulvei",
      image: hulveiQuiz,
    },
  ],
};
