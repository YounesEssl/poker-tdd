import { describe, it, expect } from 'vitest'
import { cards } from '../../src/utils/card-parser'
import { bestHand } from '../../src/evaluator/evaluate'
import { evaluateGame } from '../../src/comparator/compare'
import { HandCategory } from '../../src/models/types'

describe('Exam Examples', () => {
  describe('Example A - Ace-low straight (wheel)', () => {
    it('should find a straight with chosen5 [5,4,3,2,A]', () => {
      const board = cards('Ac', '2d', '3h', '4s', '9d')
      const hole = cards('5c', 'Kd')
      const result = bestHand(hole, board)
      expect(result.category).toBe(HandCategory.STRAIGHT)
      expect(result.chosen5).toEqual(cards('5c', '4s', '3h', '2d', 'Ac'))
    })
  })

  describe('Example B - Ace-high straight', () => {
    it('should find ace-high straight', () => {
      const board = cards('10c', 'Jd', 'Qh', 'Ks', '2d')
      const hole = cards('Ac', '3d')
      const result = bestHand(hole, board)
      expect(result.category).toBe(HandCategory.STRAIGHT)
      expect(result.chosen5).toEqual(cards('Ac', 'Ks', 'Qh', 'Jd', '10c'))
    })
  })

  describe('Example C - Flush with 6+ suited cards available', () => {
    it('should pick the 5 best hearts', () => {
      const board = cards('Ah', 'Jh', '9h', '4h', '2c')
      const hole = cards('6h', 'Kd')
      const result = bestHand(hole, board)
      expect(result.category).toBe(HandCategory.FLUSH)
      expect(result.chosen5).toEqual(cards('Ah', 'Jh', '9h', '6h', '4h'))
    })
  })

  describe('Example D - Board plays (tie)', () => {
    it('should result in a tie with both players having straight from board', () => {
      const board = cards('5c', '6d', '7h', '8s', '9d')
      const players = [
        cards('Ac', 'Ad'),
        cards('Kc', 'Qd'),
      ]
      const result = evaluateGame(board, players)
      expect(result.winners.length).toBe(2)
      expect(result.winners[0].handResult.category).toBe(HandCategory.STRAIGHT)
      expect(result.winners[0].handResult.chosen5).toEqual(cards('9d', '8s', '7h', '6d', '5c'))
    })
  })

  describe('Example E - Quads on board, kicker decides', () => {
    it('should have Player1 win with Ace kicker vs Queen kicker', () => {
      const board = cards('7c', '7d', '7h', '7s', '2d')
      const players = [
        cards('Ac', 'Kc'),
        cards('Qc', 'Jc'),
      ]
      const result = evaluateGame(board, players)
      expect(result.winners.length).toBe(1)
      expect(result.winners[0].playerIndex).toBe(0)
      expect(result.winners[0].handResult.category).toBe(HandCategory.FOUR_OF_A_KIND)
      expect(result.winners[0].handResult.rankValues).toEqual([7, 14])
    })
  })
})
