import { useRef, useState } from "react";
import { getStatus } from "./utils/chessFunctions";
import ChessBoard from "./components/ChessBoard";
import { ChessControls } from "./components/ChessControls"; // Asegúrate de exportarlo bien

export default function App() {
  const boardRef = useRef(null);
  const [, setTick] = useState(0);

  const refresh = () => setTick((t) => t + 1);

  // Cada vez que refresh() se llama, esto se re-calcula
  const { status, fen, pgn } = getStatus();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Chess React</h1>
      <ChessBoard ref={boardRef} onChange={refresh} />

      {/* Pasamos los métodos de la referencia */}
      <ChessControls
        onReset={() => boardRef.current.reset()}
        onUndo={() => boardRef.current.undo()}
      />

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>FEN:</strong> {fen}
        </p>
        <p>
          <strong>PGN:</strong> {pgn}
        </p>
      </div>
    </div>
  );
}
