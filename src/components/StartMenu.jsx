export default function StartMenu({ onStart }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h1>Chess React</h1>
      <button onClick={onStart} style={buttonStyle}>
        Comenzar Partida
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "4px",
};
