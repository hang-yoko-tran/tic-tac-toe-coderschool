import React, { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import FacebookLogin from "react-facebook-login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const responseFromFacebook = resp => {
    setCurrentUser({
      name: resp.name,
      email: resp.email
    });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const response = await fetch(
  //     `https://ftw-highscores.herokuapp.com/tictactoe-dev`
  //   );
  //   const data = await response.json();
  //   console.log('f', data);
  // };

  return (
    <div>
      {!currentUser ? (
        <FacebookLogin
          autoLoad={false}
          appId="858677014526696"
          fields="name,email,picture"
          callback={resp => responseFromFacebook(resp)}
        />
      ) : (
        <div className="body-content">
          <Game currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

export default App;
