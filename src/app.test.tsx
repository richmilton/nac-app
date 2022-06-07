import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './app';
import Player from "./enums/player";

const playGame = (moves: [number, number][]) => {
  moves.forEach((m) => {
    fireEvent.click(screen.getByRole('button', {
      name: `square-${m[0]}-${m[1]}`
    }))
  })
}

describe('noughts and crosses app', () => {
  it('should render restart button', () => {
    render(<App />)

    const buttonElement = screen.getByText(/Start again/i);
    expect(buttonElement).toBeInTheDocument();
  })

  it('should render 9 squares', async () => {
    render(<App />)

    const gridButtons = screen.getAllByTitle(/^click to claim$/i)
    expect(gridButtons).toHaveLength(9)
  })

  it('should populate the button text correctly', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', {
      name: 'square-0-0'
    }))

    let clickedButton = screen.getAllByText(Player.nought)
    expect(clickedButton).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', {
      name: 'square-2-2'
    }))

    clickedButton = screen.getAllByText(Player.cross)
    expect(clickedButton).toHaveLength(1)
  })

  it('should clear the grid when the reset button is clicked', () => {
    render(<App />)

    playGame([[0, 0], [2, 0], [0, 1], [2, 1], [0,2]])

    fireEvent.click(screen.getByRole('button', {
      name: 'reset'
    }))

    const noughtSquares = screen.queryAllByText(Player.nought)
    expect(noughtSquares).toHaveLength(0)

    const crossSquares = screen.queryAllByText(Player.cross)
    expect(crossSquares).toHaveLength(0)
  })

  it('should show the correct result for a matching row', () => {
    render(<App />)

    playGame([[0, 0], [2, 0], [0, 1], [2, 1], [0,2]])

    const result = screen.queryAllByText('Game over O has won')
    expect(result).toHaveLength(1)
  })

  it('should show the correct result for a matching column', () => {
    render(<App />)

    playGame([[0, 0], [0, 2], [1, 0], [1, 2], [2, 0]])

    const result = screen.queryAllByText('Game over O has won')
    expect(result).toHaveLength(1)
  })

  it('should show the correct result for a matching diagonal', () => {
    render(<App />)

    playGame([[0, 1], [0, 0], [1, 0], [1, 1], [0, 2], [2, 2]])

    const result = screen.queryAllByText('Game over X has won')
    expect(result).toHaveLength(1)
  })

  it('should show the correct result for stalemate', () => {
    render(<App />)

    playGame([[0, 1], [0, 0], [1, 0], [1, 1], [2, 2], [2, 2], [0, 2], [2, 0], [2, 1], [1, 2]])

    const result = screen.queryAllByText('Game over, stalemate')
    expect(result).toHaveLength(1)
  })
})
