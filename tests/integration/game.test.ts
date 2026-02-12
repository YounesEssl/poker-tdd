import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluateGame } from '../../src/comparator/compare'
import { HandCategory } from '../../src/models/types'

describe('evaluateGame', () => {
  it('should determine a clear winner between 2 players', () => {
    const board = cards('2s', '5h', '9d', 'Jc', 'Ks')
    const players = [
      cards('As', 'Ah'),  // pair of aces
      cards('3d', '7c'),  // high card
    ]
    const result = evaluateGame(board, players)
    expect(result.winners.length).toBe(1)
    expect(result.winners[0].playerIndex).toBe(0)
    expect(result.winners[0].handResult.category).toBe(HandCategory.ONE_PAIR)
  })

  it('should detect a tie (split pot) between 2 players', () => {
    const board = cards('5c', '6d', '7h', '8s', '9d')
    const players = [
      cards('As', 'Ad'),  // straight from board
      cards('Kc', 'Qd'),  // straight from board
    ]
    const result = evaluateGame(board, players)
    expect(result.winners.length).toBe(2)
    expect(result.winners[0].playerIndex).toBe(0)
    expect(result.winners[1].playerIndex).toBe(1)
  })

  it('should handle 3+ players', () => {
    const board = cards('2s', '5h', '9d', 'Jc', '4s')
    const players = [
      cards('As', 'Ah'),  // pair of aces
      cards('Kd', 'Kh'),  // pair of kings
      cards('3d', '7c'),  // high card
    ]
    const result = evaluateGame(board, players)
    expect(result.winners.length).toBe(1)
    expect(result.winners[0].playerIndex).toBe(0)
    expect(result.allResults.length).toBe(3)
  })

  it('should handle board plays (everyone has same best hand)', () => {
    const board = cards('As', 'Kh', 'Qd', 'Jc', '10s')
    const players = [
      cards('2h', '3d'),
      cards('4h', '5d'),
    ]
    const result = evaluateGame(board, players)
    expect(result.winners.length).toBe(2)
    expect(result.winners[0].handResult.category).toBe(HandCategory.STRAIGHT)
  })
})
