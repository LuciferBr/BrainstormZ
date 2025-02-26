import React, { useState, useEffect } from 'react';

const GameplaysPage = () => {
  const [activeGame, setActiveGame] = useState(null);

  // Game 1: Quantum Tic-Tac-Toe
  const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const checkWinner = (board) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };

    const handleClick = (index) => {
      if (board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = isXTurn ? 'X' : 'O';
      setBoard(newBoard);
      setIsXTurn(!isXTurn);
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) setWinner(gameWinner);
    };

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXTurn(true);
      setWinner(null);
    };

    return (
      <div>
        <h3>Quantum Tic-Tac-Toe</h3>
        <div className="game-board">
          {board.map((cell, i) => (
            <button key={i} className="game-cell" onClick={() => handleClick(i)}>
              {cell}
            </button>
          ))}
        </div>
        <p>{winner ? `Winner: ${winner}` : `Turn: ${isXTurn ? 'X' : 'O'}`}</p>
        <button onClick={resetGame}>Reset</button>
      </div>
    );
  };

  // Game 2: Neon Asteroids
  const NeonAsteroids = () => {
    const [playerPos, setPlayerPos] = useState(50); // Player's horizontal position (0-100%)
    const [asteroids, setAsteroids] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
      const movePlayer = (e) => {
        const newPos = Math.min(100, Math.max(0, (e.clientX / window.innerWidth) * 100));
        setPlayerPos(newPos);
      };
      window.addEventListener('mousemove', movePlayer);
      const spawnAsteroid = () => {
        setAsteroids((prev) => [
          ...prev,
          { id: Date.now(), x: Math.random() * 90, y: -10 }
        ]);
      };
      const interval = setInterval(() => {
        spawnAsteroid();
        setAsteroids((prev) =>
          prev.map((a) => ({ ...a, y: a.y + 2 })).filter((a) => a.y < 110)
        );
        setScore((prev) => prev + 1);
      }, 1000);
      return () => {
        window.removeEventListener('mousemove', movePlayer);
        clearInterval(interval);
      };
    }, []);

    return (
      <div className="game-container">
        <h3>Neon Asteroids</h3>
        <p>Score: {score}</p>
        <div className="game-area">
          {asteroids.map((a) => (
            <div
              key={a.id}
              className="asteroid"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
            />
          ))}
          <div className="player" style={{ left: `${playerPos}%` }} />
        </div>
      </div>
    );
  };

  // Game 3: Memory Matrix
  const MemoryMatrix = () => {
    const [grid, setGrid] = useState(Array(16).fill(false));
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [gameState, setGameState] = useState('idle');

    useEffect(() => {
      if (gameState === 'showing') {
        const newSequence = [];
        for (let i = 0; i < 4; i++) {
          newSequence.push(Math.floor(Math.random() * 16));
        }
        setSequence(newSequence);
        let i = 0;
        const flash = setInterval(() => {
          setGrid((prev) => {
            const newGrid = [...prev];
            newGrid[newSequence[i]] = true;
            return newGrid;
          });
          setTimeout(() => setGrid(Array(16).fill(false)), 500);
          i++;
          if (i === 4) {
            clearInterval(flash);
            setGameState('playing');
          }
        }, 1000);
      }
    }, [gameState]);

    const handleClick = (index) => {
      if (gameState !== 'playing') return;
      const newPlayerSequence = [...playerSequence, index];
      setPlayerSequence(newPlayerSequence);
      if (newPlayerSequence.length === sequence.length) {
        const isCorrect = newPlayerSequence.every((val, i) => val === sequence[i]);
        setGameState(isCorrect ? 'won' : 'lost');
      }
    };

    const startGame = () => {
      setGrid(Array(16).fill(false));
      setPlayerSequence([]);
      setGameState('showing');
    };

    return (
      <div>
        <h3>Memory Matrix</h3>
        <div className="game-board matrix">
          {grid.map((active, i) => (
            <button
              key={i}
              className={`game-cell ${active ? 'active' : ''}`}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
        <p>{gameState === 'won' ? 'Neural Sync Achieved!' : gameState === 'lost' ? 'Sync Failed!' : 'Memorize the Pattern'}</p>
        <button onClick={startGame}>Start</button>
      </div>
    );
  };

  // Game 4: Cyber Reaction
  const CyberReaction = () => {
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
      if (timeLeft > 0) {
        const spawnTarget = () => {
          setTarget({
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            id: Date.now()
          });
        };
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        if (!target) spawnTarget();
        return () => clearInterval(timer);
      } else {
        setTarget(null);
      }
    }, [timeLeft, target]);

    const handleClick = () => {
      setScore((prev) => prev + 1);
      setTarget(null);
    };

    const resetGame = () => {
      setScore(0);
      setTimeLeft(30);
    };

    return (
      <div className="game-container">
        <h3>Cyber Reaction</h3>
        <p>Score: {score} | Time: {timeLeft}s</p>
        <div className="game-area">
          {target && (
            <button
              className="reaction-target"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              onClick={handleClick}
            />
          )}
        </div>
        {timeLeft === 0 && <button onClick={resetGame}>Restart</button>}
      </div>
    );
  };

  // Game 5: Code Breaker
  const CodeBreaker = () => {
    const [code, setCode] = useState(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [message, setMessage] = useState('');

    const checkGuess = () => {
      if (guess.length !== 4 || isNaN(guess)) {
        setMessage('Enter a 4-digit code!');
        return;
      }
      let bulls = 0, cows = 0;
      for (let i = 0; i < 4; i++) {
        if (guess[i] === code[i]) bulls++;
        else if (code.includes(guess[i])) cows++;
      }
      setAttempts([...attempts, { guess, bulls, cows }]);
      setGuess('');
      if (bulls === 4) setMessage('Code Cracked!');
      else setMessage('');
    };

    const resetGame = () => {
      setCode(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
      setGuess('');
      setAttempts([]);
      setMessage('');
    };

    return (
      <div>
        <h3>Code Breaker</h3>
        <p>Guess the 4-digit code (Bulls: correct digit, correct spot; Cows: correct digit, wrong spot)</p>
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength={4}
          placeholder="0000"
        />
        <button onClick={checkGuess}>Submit</button>
        <button onClick={resetGame}>Reset</button>
        <p>{message}</p>
        <div>
          {attempts.map((a, i) => (
            <p key={i}>{a.guess} - {a.bulls} Bulls, {a.cows} Cows</p>
          ))}
        </div>
      </div>
    );
  };

  const games = {
    'TicTacToe': <TicTacToe />,
    'NeonAsteroids': <NeonAsteroids />,
    'MemoryMatrix': <MemoryMatrix />,
    'CyberReaction': <CyberReaction />,
    'CodeBreaker': <CodeBreaker />
  };

  return (
    <div className="App-section-holo">
      <h2>Gameplays Matrix</h2>
      <p className="AppSubtitle-cyber">Interactive neural simulations from 2070—test your skills!</p>
      <div className="game-selector">
        {Object.keys(games).map((game) => (
          <button key={game} onClick={() => setActiveGame(game)}>
            {game.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>
      <div className="game-display">
        {activeGame ? games[activeGame] : <p>Select a game to enter the Matrix!</p>}
      </div>
    </div>
  );
};

export default GameplaysPage;