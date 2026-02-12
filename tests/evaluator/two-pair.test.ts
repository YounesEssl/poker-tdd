import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Two Pair', () => {
  it('should detect two pairs', () => {
    const hand = cards('As', 'Ah', '10d', '10c', '7s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.TWO_PAIR)
  })

  it('should order chosen5 as high pair, low pair, kicker', () => {
    const hand = cards('10d', '7s', 'As', 'Ah', '10c')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('As', 'Ah', '10d', '10c', '7s'))
  })

  it('should return rankValues as [high pair, low pair, kicker]', () => {
    const hand = cards('As', 'Ah', '10d', '10c', '7s')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([14, 10, 7])
  })
})
