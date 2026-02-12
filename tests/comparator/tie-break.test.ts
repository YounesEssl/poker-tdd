import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { evaluate5 } from '../../src/evaluator/evaluate'
import { compareHands } from '../../src/comparator/compare'

describe('tie-break - High Card', () => {
  it('should break tie on second card when first is equal', () => {
    const a = evaluate5(cards('As', 'Kh', '9d', '4c', '2s'))
    const b = evaluate5(cards('Ah', 'Qd', '9c', '4s', '2h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })

  it('should break tie on third card', () => {
    const a = evaluate5(cards('As', 'Kh', '9d', '4c', '2s'))
    const b = evaluate5(cards('Ah', 'Kd', '8c', '4s', '2h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - One Pair', () => {
  it('should break tie on kickers when pair rank is equal', () => {
    const a = evaluate5(cards('As', 'Ah', 'Kd', '7c', '2s'))
    const b = evaluate5(cards('Ad', 'Ac', 'Qd', '7s', '2h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })

  it('should break tie on second kicker', () => {
    const a = evaluate5(cards('As', 'Ah', 'Kd', '8c', '2s'))
    const b = evaluate5(cards('Ad', 'Ac', 'Kc', '7s', '2h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Two Pair', () => {
  it('should break tie on low pair when high pair is equal', () => {
    const a = evaluate5(cards('As', 'Ah', 'Kd', 'Kc', '2s'))
    const b = evaluate5(cards('Ad', 'Ac', 'Qd', 'Qs', '2h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })

  it('should break tie on kicker when both pairs are equal', () => {
    const a = evaluate5(cards('As', 'Ah', 'Kd', 'Kc', '7s'))
    const b = evaluate5(cards('Ad', 'Ac', 'Ks', 'Kh', '3h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Three of a Kind', () => {
  it('should break tie on kickers when trips rank is equal', () => {
    const a = evaluate5(cards('Ks', 'Kh', 'Kd', 'Ac', '2s'))
    const b = evaluate5(cards('Kc', 'Ks', 'Kh', 'Qd', '2h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Straight', () => {
  it('should compare by highest card', () => {
    const a = evaluate5(cards('6s', '7h', '8d', '9c', '10s'))
    const b = evaluate5(cards('5h', '6d', '7c', '8s', '9h'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Flush', () => {
  it('should break tie on second card when first is equal', () => {
    const a = evaluate5(cards('Ah', 'Kh', '9h', '4h', '2h'))
    const b = evaluate5(cards('As', 'Qs', '9s', '4s', '2s'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Full House', () => {
  it('should break tie on pair when trips rank is equal', () => {
    const a = evaluate5(cards('Ks', 'Kh', 'Kd', 'Ac', 'As'))
    const b = evaluate5(cards('Kc', 'Ks', 'Kh', 'Qd', 'Qs'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Four of a Kind', () => {
  it('should break tie on kicker when quads rank is equal', () => {
    const a = evaluate5(cards('7s', '7h', '7d', '7c', 'As'))
    const b = evaluate5(cards('7s', '7h', '7d', '7c', 'Ks'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})

describe('tie-break - Straight Flush', () => {
  it('should compare by highest card', () => {
    const a = evaluate5(cards('6h', '7h', '8h', '9h', '10h'))
    const b = evaluate5(cards('5s', '6s', '7s', '8s', '9s'))
    expect(compareHands(a, b)).toBeGreaterThan(0)
  })
})
