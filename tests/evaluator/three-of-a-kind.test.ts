import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Three of a Kind', () => {
  it('should detect three of a kind', () => {
    const hand = cards('Ks', 'Kh', 'Kd', '7c', '2s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.THREE_OF_A_KIND)
  })

  it('should order chosen5 as trips then kickers descending', () => {
    const hand = cards('7c', 'Ks', '2s', 'Kh', 'Kd')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('Ks', 'Kh', 'Kd', '7c', '2s'))
  })

  it('should return rankValues as [trips rank, kicker1, kicker2]', () => {
    const hand = cards('Ks', 'Kh', 'Kd', '7c', '2s')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([13, 7, 2])
  })
})
