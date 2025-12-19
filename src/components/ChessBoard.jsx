import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { game, onDragStartLogic, onDropLogic } from "../utils/chessFunctions";

const ChessBoard = forwardRef(function ChessBoard({ onChange }, ref) {
  const containerRef = useRef(null);
  const boardRef = useRef(null); // Aquí vive el tablero real

  useEffect(() => {
    // Solo inicializamos una vez
    boardRef.current = window.ChessBoard(containerRef.current, {
      draggable: true,
      position: game.fen(),
      onDragStart: (source, piece) => onDragStartLogic(piece),
      onDrop: (source, target) => {
        const move = onDropLogic(source, target);
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
  }, []); // El array vacío es vital para que no se duplique el tablero

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
