import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const ChessBoard = forwardRef(({ config }, ref) => {
  const boardContainerRef = useRef();
  const boardInstance = useRef();

  useEffect(() => {
    if (window.ChessBoard && boardContainerRef.current) {
      boardInstance.current = window.ChessBoard(
        boardContainerRef.current,
        config
      );
    } else {
      console.error("Chessboard.js no está disponible.");
    }
  }, [config]);

  useImperativeHandle(ref, () => ({
    start: () => boardInstance.current?.position("start"),
    clear: () => boardInstance.current?.position({}),
  }));
  return (
    <div
      ref={boardContainerRef}
      style={{ width: "700px", margin: "0 auto" }}
    ></div>
  );
});

export default ChessBoard;
