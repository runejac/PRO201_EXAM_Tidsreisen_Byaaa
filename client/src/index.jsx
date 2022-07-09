import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Application } from "./application.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// *** PWA Functionality START ***

/*navigator.serviceWorker
  .register(new URL("service-worker.js", import.meta.url), { type: "module" })
  .then((reg) => {
    reg.onupdatefound = () => {
      const installingWorker = reg.installing;
      installingWorker.onstatechange = () => {
        switch (installingWorker.state) {
          case "installed":
            if (navigator.serviceWorker.controller) {
              // new update available
              console.log("new update available");

              promptUserToRefresh().then((r) => {
                window.location.reload(true);
                console.log("updated");
              });
            } else {
              // no update available
              console.log("No updates");
            }
            break;
        }
      };
    };
  })
  .catch((err) => console.error("[SW ERROR]", err));

async function promptUserToRefresh() {
  const registration = await navigator.serviceWorker.getRegistration();

  if (window.confirm("New version available! Refresh?")) {
    registration.waiting.postMessage("SKIP_WAITING");
  }
}*/
// *** PWA Functionality END *

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);
