import "../css/login.css";
import logo from "../assets/images/rlogo.svg";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CapsuleButtonYellow } from "../components/CapsuleButton.jsx";
import { checkUser, postJSON } from "../helpers/http.jsx";
import Alert from "react-bootstrap/Alert";
import { MapContext, User } from "../application.jsx";

export function LoginPage() {
  const { user, setUser } = useContext(User);

  const [newUser, setNewUser] = useState("");

  const [exists, setExists] = useState("");
  const [oldUser, setOldUser] = useState("");
  const { setMap, map } = useContext(MapContext);

  const navigate = useNavigate();

  useEffect(() => {
    map ? setMap(null) : "";
  }, [map, setMap]);

  async function handleSubmit(event) {
    event.preventDefault();

    const { name, intro, walk, points, finishedCapsules } = user;

    if (event.nativeEvent.submitter.value !== "") {
      await postJSON("api/login", { user: oldUser.name, force: true });
      setUser({
        name: oldUser.name,
        intro: oldUser.intro,
        walk: oldUser.walk,
        points: oldUser.points,
        finishedCapsules: oldUser.finishedCapsules,
      });
      navigate("/map");
    } else {
      const res = await checkUser(`name=${newUser}`);

      if (res.length > 0) {
        setExists(true);
        setOldUser(res[0]);
      } else {
        console.log("creating user: " + newUser);
        await postJSON("/api/login", { user: newUser });
        setUser({
          name: newUser,
          intro: true,
          walk: false,
          points: 0,
          finishedCapsules: [],
        });
        navigate("/map");
      }
    }
  }

  return (
    <section id="login">
      <div id="logo">
        <h1 className="logo">Tidsreisen</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <input
            data-testid={"input-login"}
            placeholder="Brukernavn"
            type="text"
            name="username"
            required
            value={newUser}
            onChange={(e) => {
              setNewUser(e.target.value);
              setExists(false);
            }}
          />
        </div>
        {exists ? (
          <>
            <Alert variant="danger">
              <Alert.Heading>
                Brukernavnet "{oldUser.name}" eksisterer allerede.
              </Alert.Heading>
              <p>Er dette deg?</p>
            </Alert>
            <CapsuleButtonYellow
              submit={"submit"}
              buttonText={"Ja, gå videre"}
              exists={oldUser.name}
            />
          </>
        ) : (
          <div>
            <CapsuleButtonYellow submit={"submit"} buttonText={"Gå videre"} />
          </div>
        )}
      </form>
      <div id={"logo-container"}>
        <img id="logoPic" width={100} src={logo} alt="Rælingen logo" />
      </div>
    </section>
  );
}
