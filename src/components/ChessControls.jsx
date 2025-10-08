export default function ChessControls({ boardRef }) {
  const handleClear = () => boardRef.current?.clear();
  const handleStart = () => boardRef.current?.start();
  const handleUndo = () => boardRef.current?.undo();

  return (
    <div stryle={{ marginTop: "20px" }}>
      <button onClick={handleClear}>Clear Board</button>
      <button onClick={handleStart}>Start Position</button>
      <button onClick={handleUndo}>Undo Move</button>
    </div>
  );
}
