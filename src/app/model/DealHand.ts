import {Hand} from "./Hand";

export class DealHand implements Hand {

  cards: number[];

  constructor(cards: number[]) {
    this.cards = cards;
  }


  points(): number {
    return this.cards.reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 8, 0), 0);
  }

  controls(): number {
    return this.cards.reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 10, 0), 0);
  }

  isBalanced(): boolean {
    return this.cardsInSuit(3) * this.cardsInSuit(2) * this.cardsInSuit(1) * this.cardsInSuit(0) > 89;
  }

  isSemiBalanced(): boolean {
    return this.yInSuit(3) * this.yInSuit(2) * this.yInSuit(1) * this.yInSuit(0) > 71;
  }

  isClassicSemiBalanced(): boolean {
    return this.cardsInSuit(3) * this.cardsInSuit(2) * this.cardsInSuit(1) * this.cardsInSuit(0) > 71;
  }

  cardsInSuit(suit: number): number {
    return this.cards.filter(card => (card >= suit * 13 && card < suit * 13 + 13)).length;
  }

  yInSuit(suit: number): number {
    let cards = this.cards.filter(card => (card >= suit * 13 && card < suit * 13 + 13));
    let l = cards.length;
    if (l == 1 && cards[0] % 13 > 9)
      return 1.3;
    return l;
  }

  pointsInSuit(suit: number): number {
    return this.cards.filter(card => (card >= suit * 13 && card < suit * 13 + 13)).reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 8, 0), 0);
  }

  controlsInSuit(suit: number): number {
    return this.cards.filter(card => (card >= suit * 13 && card < suit * 13 + 13)).reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 10, 0), 0);
  }

}
