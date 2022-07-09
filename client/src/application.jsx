import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { MapPage } from "./pages/MapPage.jsx";
import { Quiz } from "./pages/capsules/quizCapsule/Quiz.jsx";
import { History } from "./pages/capsules/HistoryCapsule/History.jsx";
import { MyFindings } from "./pages/MyFindings.jsx";
import { UserContext } from "./contexts/userContext.jsx";
import { Profile } from "./pages/Profile.jsx";
import { NotFound } from "./components/NotFound.jsx";
import { BackButton } from "./components/BackButton";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLoading } from "./helpers/useLoading.jsx";
import WithoutNavbar from "./components/WithoutNavbar";
import WithNavbar from "./components/WithNavbar";
import Audio from "./pages/capsules/AudioCapsule/Audio.jsx";
import Camera from "./components/Camera";
import WithBackButton from "./components/WithBackButton.jsx";

export const User = createContext("");
export const MapContext = React.createContext(null);

export function Application() {
  const [user, setUser] = useState([]);
  const [map, setMap] = useState(null);

  const { getUser } = useContext(UserContext);
  const { data: username, reload, loading, error } = useLoading(getUser);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const mapProvider = useMemo(() => ({ map, setMap }), [map, setMap]);

  useEffect(() => {
    username ? setUser(...username, username) : reload();
  }, [username]);

  return (
    <User.Provider value={providerValue}>
      <MapContext.Provider value={mapProvider}>
        <BrowserRouter>
          <main>
            <Routes>
              <Route element={<WithoutNavbar />}>
                <Route path="/" element={<LoginPage />} />
              </Route>
              <Route element={<WithNavbar />}>
                <Route path="/map" element={<MapPage />} />
                <Route path="/camera" element={<Camera />} />
                <Route element={<WithBackButton />}>
                  <Route path="/quiz/:id" element={<Quiz />} />
                  <Route path="/history/:id" element={<History />} />
                  <Route
                    path="/myfindings"
                    element={<MyFindings loading={loading} error={error} />}
                  />
                  <Route path="/audio/:id" element={<Audio />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path={"*"} element={<NotFound />} />
                </Route>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </MapContext.Provider>
    </User.Provider>
  );
}
