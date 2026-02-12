import { describe, it, expect } from 'vitest'
import { card, cards } from '../src/utils/card-parser'

describe('card parser', () => {
  it('should parse "As" to Ace of spades', () => {
    expect(card('As')).toEqual({ rank: 'A', suit: 'spades' })
  })

  it('should parse "10h" to 10 of hearts', () => {
    expect(card('10h')).toEqual({ rank: '10', suit: 'hearts' })
  })

  it('should parse "Kd" to King of diamonds', () => {
    expect(card('Kd')).toEqual({ rank: 'K', suit: 'diamonds' })
  })

  it('should parse "2c" to 2 of clubs', () => {
    expect(card('2c')).toEqual({ rank: '2', suit: 'clubs' })
  })

  it('should parse multiple cards with cards()', () => {
    const result = cards('As', 'Kh', '10d')
    expect(result).toEqual([
      { rank: 'A', suit: 'spades' },
      { rank: 'K', suit: 'hearts' },
      { rank: '10', suit: 'diamonds' },
    ])
  })
})
