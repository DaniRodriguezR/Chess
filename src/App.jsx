import { useRef } from "react";
import ChessBoard from "./components/ChessBoard";
import ChessControls from "./components/ChessControls";

function App() {
  const boardRef = useRef();

  const config = {
    draggable: true,
    dropOffBoard: "snapback",
    position: "start",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React + Chessboard.js + Chess.js</h1>
      <ChessBoard ref={boardRef} config={config} />
      <ChessControls boardRef={boardRef} />
    </div>
  );
}

export default App;
