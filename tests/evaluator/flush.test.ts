import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Flush', () => {
  it('should detect a flush (5 cards same suit)', () => {
    const hand = cards('Ah', 'Jh', '9h', '4h', '2h')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.FLUSH)
  })

  it('should order chosen5 by rank descending', () => {
    const hand = cards('4h', 'Ah', '9h', '2h', 'Jh')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('Ah', 'Jh', '9h', '4h', '2h'))
  })

  it('should return rankValues as 5 ranks descending', () => {
    const hand = cards('Ah', 'Jh', '9h', '4h', '2h')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([14, 11, 9, 4, 2])
  })
})
