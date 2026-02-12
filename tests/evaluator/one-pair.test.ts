import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - One Pair', () => {
  it('should detect a pair', () => {
    const hand = cards('As', 'Ah', '10d', '7c', '2s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.ONE_PAIR)
  })

  it('should order chosen5 with pair first then kickers descending', () => {
    const hand = cards('7c', 'As', 'Ah', '10d', '2s')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('As', 'Ah', '10d', '7c', '2s'))
  })

  it('should return rankValues as [pair rank, k1, k2, k3]', () => {
    const hand = cards('As', 'Ah', '10d', '7c', '2s')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([14, 10, 7, 2])
  })
})
