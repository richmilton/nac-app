import { Square } from "./square";
import React from "react";
import Player from "../enums/player";

type Row = [Player, Player, Player]
export type GridState = [Row, Row, Row]

interface GridRowProps {
  parentState: GridState
  setSquare: any
  rowIndex: number
}

interface GameGridProps {
  state: GridState
  setSquare: any
}

const GridRow = ({ parentState, setSquare, rowIndex }: GridRowProps) => <div>
  {
    parentState.map((_ , squareIndex: number) =>
      <Square ariaLabel={`square-${rowIndex}-${squareIndex}`} key={squareIndex} setValue={() => { setSquare([rowIndex, squareIndex]) }} value={parentState[rowIndex][squareIndex]} />)
  }
</div>

const GameGrid = ({ state, setSquare }: GameGridProps) => <>
  {state.map((_, i) => <GridRow key={i} rowIndex={i} parentState={state} setSquare={setSquare} />)}
</>

export default GameGrid
