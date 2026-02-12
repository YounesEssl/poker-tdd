import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Straight', () => {
  it('should detect a straight (5-6-7-8-9)', () => {
    const hand = cards('5s', '6h', '7d', '8c', '9s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT)
  })

  it('should detect ace-high straight (10-J-Q-K-A)', () => {
    const hand = cards('10s', 'Jh', 'Qd', 'Kc', 'As')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT)
    expect(result.rankValues).toEqual([14])
  })

  it('should detect ace-low straight / wheel (A-2-3-4-5) as 5-high', () => {
    const hand = cards('As', '2h', '3d', '4c', '5s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT)
    expect(result.rankValues).toEqual([5])
  })

  it('should NOT detect wrap-around (Q-K-A-2-3)', () => {
    const hand = cards('Qs', 'Kh', 'Ad', '2c', '3s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.HIGH_CARD)
  })

  it('should order chosen5 in descending straight order', () => {
    const hand = cards('8c', '5s', '7d', '6h', '9s')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('9s', '8c', '7d', '6h', '5s'))
  })

  it('should order wheel chosen5 as [5,4,3,2,A]', () => {
    const hand = cards('As', '2h', '3d', '4c', '5s')
    const result = evaluate5(hand)
    expect(result.chosen5).toEqual(cards('5s', '4c', '3d', '2h', 'As'))
  })
})
