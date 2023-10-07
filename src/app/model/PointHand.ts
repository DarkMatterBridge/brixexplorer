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

}
