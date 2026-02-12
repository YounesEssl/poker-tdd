import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { bestHand } from '../../src/evaluator/evaluate'
import { evaluateGame } from '../../src/comparator/compare'
import { HandCategory } from '../../src/models/types'

describe('Edge Cases', () => {
  describe('Flush edge cases', () => {
    it('should handle flush with exactly 5 suited cards among 7', () => {
      const board = cards('Ah', 'Jh', '9h', '4h', '2c')
      const hole = cards('6h', '3d')
      const result = bestHand(hole, board)
      expect(result.category).toBe(HandCategory.FLUSH)
      expect(result.chosen5.length).toBe(5)
      expect(result.chosen5.every(c => c.suit === 'hearts')).toBe(true)
    })

    it('should pick best 5 from 6 suited cards', () => {
      const board = cards('Ah', 'Jh', '9h', '4h', '2h')
      const hole = cards('6h', '3d')
      const result = bestHand(hole, board)
      expect(result.category).toBe(HandCategory.FLUSH)
      expect(result.chosen5).toEqual(cards('Ah', 'Jh', '9h', '6h', '4h'))
    })

    it('should pick best 5 from 7 suited cards', () => {
      const board = cards('Ah', 'Jh', '9h', '4h', '2h')
      const hole = cards('6h', '3h')
      const result = bestHand(hole, board)
      expect(result.category).toBe(HandCategory.FLUSH)
      expect(result.chosen5).toEqual(cards('Ah', 'Jh', '9h', '6h', '4h'))
    })
  })

  describe('Full house edge cases', () => {
    it('should compare full house vs full house with same trips different pair', () => {
      const board = cards('Ks', 'Kh', 'Kd', '5c', '3s')
      const players = [
        cards('Ac', 'Ad'),  // KKK + AA
        cards('Qs', 'Qd'),  // KKK + QQ
      ]
      const result = evaluateGame(board, players)
      expect(result.winners.length).toBe(1)
      expect(result.winners[0].playerIndex).toBe(0)
    })
  })

  describe('Two pair edge cases', () => {
    it('should compare two pair with same high pair different low pair', () => {
      const board = cards('As', 'Ah', '3d', '5c', '9s')
      const players = [
        cards('9d', 'Kd'),  // AA + 99, kicker K
        cards('5d', 'Kc'),  // AA + 55, kicker K
      ]
      const result = evaluateGame(board, players)
      expect(result.winners.length).toBe(1)
      expect(result.winners[0].playerIndex).toBe(0)
    })
  })

  describe('Multiple players all tied', () => {
    it('should handle 3 players all tied', () => {
      const board = cards('As', 'Kh', 'Qd', 'Jc', '10s')
      const players = [
        cards('2h', '3d'),
        cards('4h', '5d'),
        cards('6h', '7d'),
      ]
      const result = evaluateGame(board, players)
      expect(result.winners.length).toBe(3)
    })
  })
})
