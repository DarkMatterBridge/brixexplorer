export interface Hand {

  points(): number;
  controls(): number;
  isBalanced(): boolean;
  isSemiBalanced(): boolean;
  cardsInSuit(n: number): number;

}
