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

function countRanks(cards: Card[]): Map<Rank, Card[]> {
  const map = new Map<Rank, Card[]>()
  for (const c of cards) {
    const existing = map.get(c.rank) || []
    existing.push(c)
    map.set(c.rank, existing)
  }
  return map
}

export function evaluate5(hand: Card[]): HandResult {
  const sorted = sortByRankDesc(hand)
  const rankGroups = countRanks(sorted)

  const pairs: Card[][] = []
  const singles: Card[] = []
  for (const [, group] of rankGroups) {
    if (group.length === 2) pairs.push(group)
    else singles.push(...group)
  }

  // Two Pair
  if (pairs.length === 2) {
    const sortedPairs = pairs.sort((a, b) => rankValue(b[0].rank) - rankValue(a[0].rank))
    const kickers = sortByRankDesc(singles)
    return {
      category: HandCategory.TWO_PAIR,
      chosen5: [...sortedPairs[0], ...sortedPairs[1], ...kickers],
      rankValues: [rankValue(sortedPairs[0][0].rank), rankValue(sortedPairs[1][0].rank), rankValue(kickers[0].rank)],
    }
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
