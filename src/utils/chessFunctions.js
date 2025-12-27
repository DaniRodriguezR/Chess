import { Chess } from "chess.js";

// Exportamos una única instancia persistente
export const game = new Chess();

export function onDragStartLogic(piece) {
  if (game.isGameOver()) return false;

  if (
    (game.turn() === "w" && piece.search(/^b/) !== -1) ||
    (game.turn() === "b" && piece.search(/^w/) !== -1)
  ) {
    return false;
  }
  return true;
}

export function isPromotionMove(source, target) {
  const piece = game.get(source);
  if (!piece || piece.type !== "p") return false;

  const isWhitePromoting =
    piece.color === "w" && target[1] === "8" && source[1] === "7";
  const isBlackPromoting =
    piece.color === "b" && target[1] === "1" && source[1] === "2";
  return isWhitePromoting || isBlackPromoting;
}

export function promotePawn(from, to, promotion) {
  return game.move({
    from,
    to,
    promotion,
  });
}

export function onDropLogic(source, target) {
  try {
    const move = game.move({
      from: source,
      to: target,
      promotion: isPromotionMove(source, target),
    });
    console.log("target:", target, "source:", source);
    if (move === null) return "snapback";
    return move;
  } catch (e) {
    console.error(e);
    return "snapback";
  }
}

export function getStatus() {
  let status = "";
  let moveColor = game.turn() === "w" ? "Blanco" : "Negro";

  if (game.isCheckmate()) {
    status = `Juego terminado, ${moveColor} en jaque mate.`;
  } else if (game.isDraw()) {
    status = "Juego terminado, tablas.";
  } else {
    status = `${moveColor} a mover.`;
    if (game.isCheck()) status += `, ${moveColor} está en jaque`;
  }

  return {
    status,
    fen: game.fen(),
    pgn: game.pgn(),
  };
}
