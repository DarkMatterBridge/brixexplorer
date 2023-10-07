class RealHand implements Hand {

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

}
