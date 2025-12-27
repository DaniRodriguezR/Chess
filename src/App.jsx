import { useState } from "react";
import StartMenu from "./components/StartMenu";
import ChessGameContainer from "./components/ChessGameContainer";

export default function App() {
  const [screen, setScreen] = useState("menu");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {screen === "menu" && <StartMenu onStart={() => setScreen("game")} />}
      {screen === "game" && <ChessGameContainer />}
    </div>
  );
}
