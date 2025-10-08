import { useRef } from "react";
import ChessBoard from "./components/ChessBoard";
import ChessControls from "./components/ChessControls";

function App() {
  const config = {
    draggable: true,
    dropOffBoard: "snapback",
    position: "start",
  };
  const boardRef = useRef();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React + Chessboard.js</h1>
      <ChessBoard ref={boardRef} config={config} />
      <ChessControls boardRef={boardRef} />
    </div>
  );
}

export default App;
