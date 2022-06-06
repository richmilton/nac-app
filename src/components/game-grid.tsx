import { Square } from "./square";
import React from "react";
import Player from "../enums/player";

type Row = Player[]
export type GridState = Row[]

interface GridRowProps {
  parentState: GridState
  setSquare: any
  index: number
}

interface GameGridProps {
  state: GridState
  setSquare: any
}

const GridRow = ({ parentState, setSquare, index }: GridRowProps) => <div>
  {
    parentState.map((_ , i: number) =>
      <Square ariaLabel={`square-${index}-${i}`} key={i} setValue={() => { setSquare([index, i]) }} value={parentState[index][i]} />)
  }
</div>

const GameGrid = ({ state, setSquare }: GameGridProps) => <>
  {state.map((_, i) => <GridRow key={i} index={i} parentState={state} setSquare={setSquare} />)}
</>

export default GameGrid
