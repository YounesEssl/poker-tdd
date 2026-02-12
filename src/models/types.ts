export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

export interface Card {
  rank: Rank
  suit: Suit
}

export enum HandCategory {
  HIGH_CARD = 1,
  ONE_PAIR = 2,
  TWO_PAIR = 3,
  THREE_OF_A_KIND = 4,
  STRAIGHT = 5,
  FLUSH = 6,
  FULL_HOUSE = 7,
  FOUR_OF_A_KIND = 8,
  STRAIGHT_FLUSH = 9,
}

export interface HandResult {
  category: HandCategory
  chosen5: Card[]
  rankValues: number[]
}

export interface PlayerResult {
  playerIndex: number
  handResult: HandResult
}

export interface GameResult {
  winners: PlayerResult[]
  allResults: PlayerResult[]
}
