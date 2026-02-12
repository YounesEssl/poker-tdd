import { describe, it, expect } from 'vitest'
import { card, cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - High Card', () => {
  it('should detect high card when no combination exists', () => {
    const hand = cards('As', '10d', '7h', '4c', '2s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.HIGH_CARD)
  })

  it('should order chosen5 by rank descending', () => {
    const hand = cards('4c', 'As', '7h', '2s', '10d')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('As', '10d', '7h', '4c', '2s'))
  })

  it('should return rankValues as 5 ranks descending', () => {
    const hand = cards('As', '10d', '7h', '4c', '2s')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([14, 10, 7, 4, 2])
  })
})
