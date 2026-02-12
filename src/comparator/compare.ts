import { Card, GameResult, HandResult, PlayerResult } from '../models/types'
import { bestHand } from '../evaluator/evaluate'

export function compareHands(a: HandResult, b: HandResult): number {
  if (a.category !== b.category) return a.category - b.category
  for (let i = 0; i < Math.min(a.rankValues.length, b.rankValues.length); i++) {
    if (a.rankValues[i] !== b.rankValues[i]) return a.rankValues[i] - b.rankValues[i]
  }
  return 0
}

export function evaluateGame(board: Card[], players: Card[][]): GameResult {
  const allResults: PlayerResult[] = players.map((hole, index) => ({
    playerIndex: index,
    handResult: bestHand(hole, board),
  }))

  const sorted = [...allResults].sort((a, b) => compareHands(b.handResult, a.handResult))
  const bestResult = sorted[0]

  const winners = sorted.filter(r => compareHands(r.handResult, bestResult.handResult) === 0)

  return { winners, allResults }
}
