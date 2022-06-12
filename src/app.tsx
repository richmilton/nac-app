import React from 'react';
import './app.css';
import GameGrid, { GridState } from "./components/game-grid";
import Player from "./enums/player";

const App = () => {
  const initialState: GridState = [
    [Player.blank, Player.blank, Player.blank],
    [Player.blank, Player.blank, Player.blank],
    [Player.blank, Player.blank, Player.blank],
  ]

  const [state, setState] = React.useState<GridState>(initialState)
  const [activePlayer, setActivePlayer] = React.useState<Player>(Player.nought)
  const [winner, setWinner] = React.useState<Player>(Player.blank)

  const stalemate = state.every(s => s.every(s => s !== Player.blank)) && !winner

  const scoreGame = () => {
    const checkRow = (player: Player) =>
      state.some(r => r.every(s => s === player))

    const checkCol = (player: Player) =>
      state.every((r) => r[0] === player) ||
      state.every((r) => r[1] === player) ||
      state.every((r) => r[2] === player)

    const checkDiag = (player: Player) =>
      [state[0][0], state[1][1], state[2][2]].every(d => d === player) ||
      [state[0][2], state[1][1], state[2][0]].every(d => d === player)

    const checkWon = (player: Player) => checkRow(player) || checkCol(player) || checkDiag(player)

    const newWinner: Player =
      (checkWon(Player.nought) && Player.nought) ||
      (checkWon(Player.cross) && Player.cross) ||
      Player.blank

    setWinner(newWinner)
  }

  const setSquare = (coOrds: number[]) => {
    if (!state[coOrds[0]][coOrds[1]] && !winner) {
      const currentState: GridState = [...state]
      currentState[coOrds[0]][coOrds[1]] = activePlayer
      setState(currentState)
      setActivePlayer(activePlayer === Player.nought ? Player.cross : Player.nought)
      scoreGame()
    }
  }

  const reset = () => {
    setState(initialState)
    setWinner(Player.blank)
  }

  return (
    <div className="game">
      <GameGrid state={state} setSquare={setSquare} />
      <div className="game-over fullwidth">{(winner && `Game over ${winner} has won`) || (stalemate && 'Game over, stalemate')}</div>
      <div>
        <button aria-label='reset' onClick={reset} className="fullwidth">Start again</button>
      </div>
    </div>
  )
}

export default App;
