import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { HandCategory } from '../../src/models/types'

describe('evaluate5 - Category Priority', () => {
  it('should detect straight flush over flush and straight', () => {
    const hand = cards('5h', '6h', '7h', '8h', '9h')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.STRAIGHT_FLUSH)
    expect(result.category).not.toBe(HandCategory.FLUSH)
    expect(result.category).not.toBe(HandCategory.STRAIGHT)
  })

  it('should detect full house over three of a kind', () => {
    const hand = cards('Ks', 'Kh', 'Kd', '7c', '7s')
    const result = evaluate5(hand)
    expect(result.category).toBe(HandCategory.FULL_HOUSE)
  })

  it('should verify global category ordering is correct', () => {
    const straightFlush = evaluate5(cards('5h', '6h', '7h', '8h', '9h'))
    const fourOfAKind = evaluate5(cards('7s', '7h', '7d', '7c', 'As'))
    const fullHouse = evaluate5(cards('Ks', 'Kh', 'Kd', '7c', '7s'))
    const flush = evaluate5(cards('Ah', 'Jh', '9h', '4h', '2h'))
    const straight = evaluate5(cards('5s', '6h', '7d', '8c', '9s'))
    const threeOfAKind = evaluate5(cards('Ks', 'Kh', 'Kd', '7c', '2s'))
    const twoPair = evaluate5(cards('As', 'Ah', '10d', '10c', '7s'))
    const onePair = evaluate5(cards('As', 'Ah', '10d', '7c', '2s'))
    const highCard = evaluate5(cards('As', '10d', '7h', '4c', '2s'))

    expect(straightFlush.category).toBeGreaterThan(fourOfAKind.category)
    expect(fourOfAKind.category).toBeGreaterThan(fullHouse.category)
    expect(fullHouse.category).toBeGreaterThan(flush.category)
    expect(flush.category).toBeGreaterThan(straight.category)
    expect(straight.category).toBeGreaterThan(threeOfAKind.category)
    expect(threeOfAKind.category).toBeGreaterThan(twoPair.category)
    expect(twoPair.category).toBeGreaterThan(onePair.category)
    expect(onePair.category).toBeGreaterThan(highCard.category)
  })
})
