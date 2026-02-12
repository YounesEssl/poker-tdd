import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Full House', () => {
  it('should detect a full house (trips + pair)', () => {
    const hand = cards('Ks', 'Kh', 'Kd', '7c', '7s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.FULL_HOUSE)
  })

  it('should order chosen5 as trips then pair', () => {
    const hand = cards('7c', 'Ks', '7s', 'Kh', 'Kd')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('Ks', 'Kh', 'Kd', '7c', '7s'))
  })

  it('should return rankValues as [trips rank, pair rank]', () => {
    const hand = cards('Ks', 'Kh', 'Kd', '7c', '7s')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([13, 7])
  })
})
