import {Deal} from "../Deal";
import {HandChecker} from "../handChecker";

export class Dealer {

  condtions: HandChecker[];
  deal: Deal = new Deal();

  constructor() {
    this.condtions = new Array(4);
    this.condtions[0] = () => true;
    this.condtions[1] = () => true;
    this.condtions[2] = () => true;
    this.condtions[3] = () => true;
  }

  getDeal(): Deal {
    return this.deal;
  }

  shuffle() {
    this.deal.shuffle();
  }

  check(): boolean {
    return this.condtions[0](this.deal.getHand(0)) &&
      this.condtions[1](this.deal.getHand(1)) &&
      this.condtions[2](this.deal.getHand(2)) &&
      this.condtions[3](this.deal.getHand(3));
  }
}
