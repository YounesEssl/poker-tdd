# Texas Hold'em Poker Hand Evaluator

A complete Texas Hold'em poker hand evaluator and comparator built with TypeScript, following strict TDD methodology.

## How to run tests

```bash
npm test
```

## Project structure

```
src/
  models/types.ts         - Card, HandCategory, HandResult, GameResult types
  evaluator/evaluate.ts   - evaluate5(), bestHand()
  comparator/compare.ts   - compareHands(), evaluateGame()
  utils/card-parser.ts    - card(), cards() helpers
  utils/combinations.ts   - C(n,k) combinations generator
tests/
  card-parser.test.ts
  best-hand.test.ts
  evaluator/              - One test file per hand category
  comparator/             - compareHands and tie-break tests
  integration/            - Full game and exam example tests
```

## Card notation

Cards use a short notation: rank followed by suit letter.

- **Suits**: `h` = hearts, `d` = diamonds, `c` = clubs, `s` = spades
- **Ranks**: `2`-`9`, `10`, `J`, `Q`, `K`, `A`

Examples: `As` = Ace of spades, `10h` = 10 of hearts, `Kd` = King of diamonds

## Hand categories (highest to lowest)

| # | Category | chosen5 order | rankValues |
|---|----------|---------------|------------|
| 9 | Straight Flush | Descending straight order (wheel: 5,4,3,2,A) | [highest card] |
| 8 | Four of a Kind | Quads, then kicker | [quads rank, kicker rank] |
| 7 | Full House | Trips, then pair | [trips rank, pair rank] |
| 6 | Flush | Descending rank | [5 ranks descending] |
| 5 | Straight | Descending straight order (wheel: 5,4,3,2,A) | [highest card] |
| 4 | Three of a Kind | Trips, then kickers descending | [trips rank, k1, k2] |
| 3 | Two Pair | High pair, low pair, kicker | [high pair, low pair, kicker] |
| 2 | One Pair | Pair, then kickers descending | [pair rank, k1, k2, k3] |
| 1 | High Card | Descending rank | [5 ranks descending] |

## Special rules

- **Ace-low straight (wheel)**: A-2-3-4-5 is a valid straight (5-high, not Ace-high)
- **No wrap-around**: Q-K-A-2-3 is NOT a straight
- **Suits never break ties**: suits are only used for flush detection
- **No duplicate cards assumed**: input is expected to have no duplicate cards

## API

```typescript
// Parse cards
card('As')                    // { rank: 'A', suit: 'spades' }
cards('As', 'Kh', '10d')     // Card[]

// Evaluate 5 cards
evaluate5(cards)              // HandResult

// Best hand from 7 cards (2 hole + 5 board)
bestHand(holeCards, board)    // HandResult

// Compare two hands
compareHands(a, b)            // -1 | 0 | 1

// Full game evaluation
evaluateGame(board, players)  // GameResult with winners
```
