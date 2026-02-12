import { Card, Rank, Suit } from '../models/types'

const SUIT_MAP: Record<string, Suit> = {
  h: 'hearts',
  d: 'diamonds',
  c: 'clubs',
  s: 'spades',
}

export function card(notation: string): Card {
  const suitChar = notation[notation.length - 1]
  const rankStr = notation.slice(0, -1)
  return {
    rank: rankStr as Rank,
    suit: SUIT_MAP[suitChar],
  }
}

export function cards(...notations: string[]): Card[] {
  return notations.map(card)
}
