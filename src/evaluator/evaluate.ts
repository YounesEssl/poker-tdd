import { Card, HandCategory, HandResult, Rank } from '../models/types'
import { combinations } from '../utils/combinations'
import { compareHands } from '../comparator/compare'

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

function detectStraight(sorted: Card[]): HandResult | null {
  const values = sorted.map(c => rankValue(c.rank))

  const isNormalStraight = values.every((v, i) => i === 0 || values[i - 1] - v === 1)
  if (isNormalStraight) {
    return {
      category: HandCategory.STRAIGHT,
      chosen5: sorted,
      rankValues: [values[0]],
    }
  }

  if (values[0] === 14 && values[1] === 5 && values[2] === 4 && values[3] === 3 && values[4] === 2) {
    return {
      category: HandCategory.STRAIGHT,
      chosen5: [...sorted.slice(1), sorted[0]],
      rankValues: [5],
    }
  }

  return null
}

export function evaluate5(hand: Card[]): HandResult {
  const sorted = sortByRankDesc(hand)
  const rankGroups = countRanks(sorted)
  const isFlush = sorted.every(c => c.suit === sorted[0].suit)

  const quads: Card[][] = []
  const trips: Card[][] = []
  const pairs: Card[][] = []
  const singles: Card[] = []
  for (const [, group] of rankGroups) {
    if (group.length === 4) quads.push(group)
    else if (group.length === 3) trips.push(group)
    else if (group.length === 2) pairs.push(group)
    else singles.push(...group)
  }

  // Four of a Kind
  if (quads.length === 1) {
    const quad = quads[0]
    const kicker = sortByRankDesc([...singles, ...pairs.flat(), ...trips.flat()])[0]
    return {
      category: HandCategory.FOUR_OF_A_KIND,
      chosen5: [...quad, kicker],
      rankValues: [rankValue(quad[0].rank), rankValue(kicker.rank)],
    }
  }

  // Full House
  if (trips.length === 1 && pairs.length === 1) {
    const trip = trips[0]
    const pair = pairs[0]
    return {
      category: HandCategory.FULL_HOUSE,
      chosen5: [...trip, ...pair],
      rankValues: [rankValue(trip[0].rank), rankValue(pair[0].rank)],
    }
  }

  // Straight Flush / Flush
  if (isFlush) {
    const straightResult = detectStraight(sorted)
    if (straightResult) {
      return { ...straightResult, category: HandCategory.STRAIGHT_FLUSH }
    }
    return {
      category: HandCategory.FLUSH,
      chosen5: sorted,
      rankValues: sorted.map(c => rankValue(c.rank)),
    }
  }

  // Three of a Kind
  if (trips.length === 1 && pairs.length === 0) {
    const trip = trips[0]
    const kickers = sortByRankDesc(singles)
    return {
      category: HandCategory.THREE_OF_A_KIND,
      chosen5: [...trip, ...kickers],
      rankValues: [rankValue(trip[0].rank), ...kickers.map(c => rankValue(c.rank))],
    }
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

  // Straight
  const straightResult = detectStraight(sorted)
  if (straightResult) return straightResult

  // High Card
  const values = sorted.map(c => rankValue(c.rank))
  return {
    category: HandCategory.HIGH_CARD,
    chosen5: sorted,
    rankValues: values,
  }
}

export function bestHand(holeCards: Card[], board: Card[]): HandResult {
  const allCards = [...holeCards, ...board]
  const combos = combinations(allCards, 5)
  let best = evaluate5(combos[0])
  for (let i = 1; i < combos.length; i++) {
    const current = evaluate5(combos[i])
    if (compareHands(current, best) > 0) {
      best = current
    }
  }
  return best
}
