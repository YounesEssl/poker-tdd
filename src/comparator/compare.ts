import { HandResult } from '../models/types'

export function compareHands(a: HandResult, b: HandResult): number {
  if (a.category !== b.category) return a.category - b.category
  for (let i = 0; i < Math.min(a.rankValues.length, b.rankValues.length); i++) {
    if (a.rankValues[i] !== b.rankValues[i]) return a.rankValues[i] - b.rankValues[i]
  }
  return 0
}
