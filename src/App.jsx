import { useEffect, useRef } from "react";

function App() {
  const boardRef = useRef(null);
  const config = {
    draggable: true,
    dropOffBoard: "snapback", // this is the default
    position: "start",
  };

  useEffect(() => {
    setTimeout(() => {
      if (window.Chessboard) {
        window.Chessboard(boardRef.current, config);
      } else {
        console.error("Chessboard.js no está disponible en window.");
      }
    }, 100);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React + Chessboard.js</h1>
      <div
        ref={boardRef}
        id="board1"
        style={{ width: "400px", margin: "20px auto" }}
      ></div>
      <button id="clearBoardBtn">Clear Board</button>
      <button id="startPositionBtn">Start Position</button>
      <button id="clearBoardInstantBtn">Clear Board Instant</button>
    </div>
  );
}

export default App;
