export default function ChessControls({ onReset, onUndo }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={onReset} style={buttonStyle}>
        Nuevo Juego
      </button>
      <button onClick={onUndo} style={buttonStyle}>
        Deshacer
      </button>
    </div>
  );
}

// Extraemos los estilos para que el JSX sea más legible
const buttonStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "4px",
};
