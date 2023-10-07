export interface Hand {

  points(): number;
  controls(): number;
  isBalanced(): boolean;
  isSemiBalanced(): boolean;

}
