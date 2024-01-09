import {Hand} from "./Hand";

class PointHand implements Hand {

  p: number

  constructor(points: number) {
    this.p = points;
  }

  points(): number {
    return this.p;
  }

  controls(): number {
    return 0;
  }

  isBalanced(): boolean {
    return false;
  }

  isSemiBalanced(): boolean {
    return false;
  }

  cardsInSuit(n: number): number {
    return 1;
  }

}
