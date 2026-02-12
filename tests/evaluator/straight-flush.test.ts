import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Straight Flush', () => {
  it('should detect a straight flush', () => {
    const hand = cards('5h', '6h', '7h', '8h', '9h')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT_FLUSH)
  })

  it('should detect royal flush as straight flush ace-high', () => {
    const hand = cards('10s', 'Js', 'Qs', 'Ks', 'As')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT_FLUSH)
    expect(result.rankValues).toEqual([14])
  })

  it('should detect ace-low straight flush as 5-high', () => {
    const hand = cards('Ah', '2h', '3h', '4h', '5h')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT_FLUSH)
    expect(result.rankValues).toEqual([5])
  })

  it('should return rankValues as [highest card in straight]', () => {
    const hand = cards('5h', '6h', '7h', '8h', '9h')
    const result = evaluate5(hand)
    expect(result.rankValues).toEqual([9])
  })

  it('should order chosen5 in descending straight order', () => {
    const hand = cards('7h', '5h', '8h', '6h', '9h')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('9h', '8h', '7h', '6h', '5h'))
  })

  it('should order ace-low straight flush chosen5 as [5,4,3,2,A]', () => {
    const hand = cards('Ah', '2h', '3h', '4h', '5h')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('5h', '4h', '3h', '2h', 'Ah'))
  })
})
