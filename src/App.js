// import "./index.css";
import { useState } from "react";

function Sqaure({ value, onSquareClick }) {
  return (
    <button className="sqaure" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, sqaures, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(sqaures) || sqaures[i]) {
      return;
    }
    const nextSquares = sqaures.slice();
    if (xIsNext) {
      nextSquares[i] = " X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(sqaures);
  let status;
  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Sqaure value={Sqaure[0]} onSquareClick={() => handleClick(0)} />
        <Sqaure value={Sqaure[1]} onSquareClick={() => handleClick(1)} />
        <Sqaure value={Sqaure[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Sqaure value={Sqaure[3]} onSquareClick={() => handleClick(3)} />
        <Sqaure value={Sqaure[4]} onSquareClick={() => handleClick(4)} />
        <Sqaure value={Sqaure[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Sqaure value={Sqaure[6]} onSquareClick={() => handleClick(6)} />
        <Sqaure value={Sqaure[7]} onSquareClick={() => handleClick(7)} />
        <Sqaure value={Sqaure[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((sqaures, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #." + move;
    } else {
      description = " Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} sqaures={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(sqaures) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (sqaures[a] && sqaures[a] === sqaures[b] && sqaures[a] === sqaures[c]) {
      return sqaures[a];
    }
  }
  return null;
}
