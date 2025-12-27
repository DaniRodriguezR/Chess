import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import {
  game,
  isPromotionMove,
  onDragStartLogic,
  onDropLogic,
} from "../utils/chessFunctions";

const ChessBoard = forwardRef(function ChessBoard(
  { onChange, onPromotionRequest },
  ref
) {
  const containerRef = useRef(null);
  const boardRef = useRef(null); // Aquí vive el tablero real

  useEffect(() => {
    // Solo inicializamos una vez
    boardRef.current = window.ChessBoard(containerRef.current, {
      draggable: true,
      position: game.fen(),
      // DEBEMOS darle como paremetro source, position y orientation aunque no los usemos porque
      // si no Chessboard.js falla al pensar que si juegas en la columna b es porque va el negro.
      onDragStart: (source, piece, position, orientation) => {
        return onDragStartLogic(source, piece, position, orientation);
      },
      onDrop: (source, target, piece) => {
        if (isPromotionMove(source, target)) {
          onPromotionRequest({
            color: game.turn(),
            from: source,
            to: target,
          });
          return;
        }

        const move = onDropLogic(source, target, piece);
        if (move === "snapback") return "snapback";

        // Sincronizamos con React inmediatamente
        onChange();
      },
      onSnapEnd: () => {
        // Obliga al tablero visual a ponerse donde dice la lógica de chess.js
        boardRef.current.position(game.fen());
      },
    });

    return () => boardRef.current?.destroy();
  }, [onChange]); // El array vacío es vital para que no se duplique el tablero

  useImperativeHandle(ref, () => ({
    reset() {
      game.reset();
      boardRef.current.position("start");
      onChange();
    },
    undo() {
      game.undo();
      boardRef.current.position(game.fen());
      onChange();
    },
  }));

  return (
    <div ref={containerRef} style={{ width: "400px", margin: "0 auto" }} />
  );
});

export default ChessBoard;
