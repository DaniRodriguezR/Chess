import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Chess } from "chess.js";

const ChessBoard = forwardRef(({ config }, ref) => {
  const boardContainerRef = useRef();
  const boardInstance = useRef();
  const game = useRef(new Chess());

  useEffect(() => {
    if (window.ChessBoard && boardContainerRef.current) {
      boardInstance.current = window.ChessBoard(boardContainerRef.current, {
        ...config,
        onDrop: (source, target) => {
          const move = game.current.move({
            from: source,
            to: target,
            promotion: "q",
          });

          if (!move) return "snapback";

          boardInstance.current.position(game.current.fen());
        },
      });

      const handleRightClick = (event) => {
        event.preventDefault();
        game.current.undo();
        boardInstance.current.position(game.current.fen());
      };

      const node = boardContainerRef.current;
      node.addEventListener("contextmenu", handleRightClick);

      return () => {
        node.removeEventListener("contextmenu", handleRightClick);
      };
    } else {
      console.error("Chessboard no disponible");
    }
  }, [config]);

  useImperativeHandle(ref, () => ({
    start: () => {
      game.current.reset();
      boardInstance.current?.position("start");
    },
    clear: () => {
      game.current.clear();
      boardInstance.current?.position({});
    },
    undo: () => {
      game.current.undo();
      boardInstance.current?.position(game.current.fen());
    },
    getFEN: () => game.current.fen(),
  }));
  return (
    <div
      ref={boardContainerRef}
      style={{ width: "700px", margin: "0 auto" }}
    ></div>
  );
});

export default ChessBoard;
