import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Four of a Kind', () => {
  it('should detect four of a kind', () => {
    const hand = cards('7s', '7h', '7d', '7c', 'As')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.FOUR_OF_A_KIND)
  })

  it('should order chosen5 as quads then kicker', () => {
    const hand = cards('As', '7s', '7h', '7d', '7c')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('7s', '7h', '7d', '7c', 'As'))
  })

  it('should return rankValues as [quads rank, kicker rank]', () => {
    const hand = cards('7s', '7h', '7d', '7c', 'As')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([7, 14])
  })
})
