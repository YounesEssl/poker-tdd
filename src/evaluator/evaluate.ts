import { Card, HandCategory, HandResult, Rank } from '../models/types'

const RANK_VALUES: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
}

export function rankValue(rank: Rank): number {
  return RANK_VALUES[rank]
}

function sortByRankDesc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => rankValue(b.rank) - rankValue(a.rank))
}

export function evaluate5(hand: Card[]): HandResult {
  const sorted = sortByRankDesc(hand)

  // Count cards by rank
  const rankMap = new Map<Rank, Card[]>()
  for (const c of sorted) {
    const existing = rankMap.get(c.rank) || []
    existing.push(c)
    rankMap.set(c.rank, existing)
  }

  const pairs: Card[][] = []
  const singles: Card[] = []
  for (const [, group] of rankMap) {
    if (group.length === 2) pairs.push(group)
    else singles.push(...group)
  }

  // One Pair
  if (pairs.length === 1) {
    const pair = pairs[0]
    const kickers = sortByRankDesc(singles)
    return {
      category: HandCategory.ONE_PAIR,
      chosen5: [...pair, ...kickers],
      rankValues: [rankValue(pair[0].rank), ...kickers.map(c => rankValue(c.rank))],
    }
  }

  // High Card
  const values = sorted.map(c => rankValue(c.rank))
  return {
    category: HandCategory.HIGH_CARD,
    chosen5: sorted,
    rankValues: values,
  }
}
