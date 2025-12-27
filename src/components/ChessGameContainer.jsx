import { useRef, useState } from "react";
import { getStatus, promotePawn } from "../utils/chessFunctions";
import ChessBoard from "../components/ChessBoard";
import ChessControls from "../components/ChessControls";
import PromotionSelector from "../components/PromotionSelector";

export default function ChessGameContainer() {
  const boardRef = useRef(null);
  const [, setTick] = useState(0);
  const [pendingPromotion, setPendingPromotion] = useState(null);

  const refresh = () => setTick((t) => t + 1);

  // Cada vez que refresh() se llama, esto se re-calcula
  const { status, fen, pgn } = getStatus();

  const cleanPgn = pgn.replace(/\[.*?\]/g, "").trim();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ChessBoard
        ref={boardRef}
        onChange={refresh}
        onPromotionRequest={setPendingPromotion}
      />

      {pendingPromotion && (
        <PromotionSelector
          color={pendingPromotion.color}
          onSelect={(piece) => {
            promotePawn(pendingPromotion.from, pendingPromotion.to, piece);
            setPendingPromotion(null);
            refresh();
          }}
        />
      )}
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
          <strong>PGN:</strong> {cleanPgn || " "}
        </p>
      </div>
    </div>
  );
}
