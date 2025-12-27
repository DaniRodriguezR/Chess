export default function PromotionSelector({ color, onSelect }) {
  const pieces = ["q", "r", "b", "n"];
  console.log(color, onSelect);

  return (
    <div className="promotion-overlay">
      {pieces.map((p) => (
        <img
          key={p}
          src={`/public/img/chesspieces/wikipedia/${color}${p}.png`}
          onClick={() => onSelect(p)}
        />
      ))}
    </div>
  );
}
