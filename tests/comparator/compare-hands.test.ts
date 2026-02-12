import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { compareHands } from '../../src/comparator/compare'

describe('compareHands', () => {
  it('should return positive when first hand has higher category', () => {
    const flush = evaluate5(cards('Ah', 'Jh', '9h', '4h', '2h'))
    const straight = evaluate5(cards('5s', '6h', '7d', '8c', '9s'))
    expect(compareHands(flush, straight)).toBeGreaterThan(0)
  })

  it('should return negative when first hand has lower category', () => {
    const onePair = evaluate5(cards('As', 'Ah', '10d', '7c', '2s'))
    const threeOfAKind = evaluate5(cards('Ks', 'Kh', 'Kd', '7c', '2s'))
    expect(compareHands(onePair, threeOfAKind)).toBeLessThan(0)
  })

  it('should return 0 for identical hands', () => {
    const hand1 = evaluate5(cards('As', '10d', '7h', '4c', '2s'))
    const hand2 = evaluate5(cards('Ah', '10c', '7d', '4s', '2h'))
    expect(compareHands(hand1, hand2)).toBe(0)
  })

  it('should tie-break by rankValues when same category', () => {
    const higherPair = evaluate5(cards('As', 'Ah', '10d', '7c', '2s'))
    const lowerPair = evaluate5(cards('Ks', 'Kh', '10d', '7c', '2s'))
    expect(compareHands(higherPair, lowerPair)).toBeGreaterThan(0)
  })
})
