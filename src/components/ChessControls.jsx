// Componente ChessControls
export function ChessControls({ game, onReset, onUndo }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={onReset}
        style={{
          padding: "10px 20px",
          margin: "0 5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Nuevo Juego
      </button>
      <button
        onClick={onUndo}
        style={{
          padding: "10px 20px",
          margin: "0 5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Deshacer
      </button>
    </div>
  );
}
