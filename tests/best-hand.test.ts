import { describe, it, expect } from 'vitest'
import { cards } from '../src/utils/card-parser'
import { combinations } from '../src/utils/combinations'
import { bestHand } from '../src/evaluator/evaluate'
import { HandCategory } from '../src/models/types'

describe('combinations', () => {
  it('should generate 21 combinations of 7 cards taken 5 at a time', () => {
    const sevenCards = cards('As', 'Kh', 'Qd', 'Jc', '10s', '9h', '8d')
    const combos = combinations(sevenCards, 5)
    expect(combos.length).toBe(21)
  })

  it('should generate combinations of correct size', () => {
    const sevenCards = cards('As', 'Kh', 'Qd', 'Jc', '10s', '9h', '8d')
    const combos = combinations(sevenCards, 5)
    combos.forEach(combo => expect(combo.length).toBe(5))
  })
})

describe('bestHand', () => {
  it('should find the best hand from 7 cards (obvious case)', () => {
    const board = cards('2s', '3h', '7d', '8c', '9s')
    const hole = cards('Ah', 'Kd')
    const result = bestHand(hole, board)
    expect(result.category).toBe(HandCategory.HIGH_CARD)
    expect(result.rankValues[0]).toBe(14) // Ace high
  })

  it('should find a straight using only one hole card', () => {
    const board = cards('5s', '6h', '7d', '8c', '2s')
    const hole = cards('9h', 'Kd')
    const result = bestHand(hole, board)
    expect(result.category).toBe(HandCategory.STRAIGHT)
    expect(result.rankValues).toEqual([9])
  })

  it('should detect board plays (best hand is on board)', () => {
    const board = cards('As', 'Kh', 'Qd', 'Jc', '10s')
    const hole = cards('2h', '3d')
    const result = bestHand(hole, board)
    expect(result.category).toBe(HandCategory.STRAIGHT)
    expect(result.rankValues).toEqual([14])
  })
})
