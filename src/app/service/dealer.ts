import {Injectable} from '@angular/core';
import {Deal} from "../model/Deal";
import {HandChecker} from "../model/handChecker";
import {Hand} from "../model/Hand";
import {GeneratedDeal} from "../model/GeneratedDeal";

@Injectable({
  providedIn: 'root'
})
export class Dealer {

  maxTries = 1000000

  constructor() {
    // this.resetDeck()
  }

  // resetDeck() {
  //   this.deal = new Deal()
  // }

  plainShuffle(): Deal {
    var deal = new Deal()
    deal.shuffle1Hand()
    return deal
  }

  shuffle(handCheckers: HandChecker[], maxTries: number): GeneratedDeal | undefined {
    var deal = new GeneratedDeal()
    let n = 0;
    do {
      deal.shuffle1Hand()
      n++;
    } while (n < maxTries &&
    !(handCheckers[0](deal.getHand(0)) &&
      handCheckers[1](deal.getHand(1)) &&
      handCheckers[2](deal.getHand(2)) &&
      handCheckers[3](deal.getHand(3))))
    if (n == this.maxTries)
      return undefined
    deal.generationNo = n
    return deal
  }


  shuffle1(handChecker: HandChecker, maxTries: number): GeneratedDeal | undefined {
    var deal = new GeneratedDeal()
    let n = 0;
    do {
      deal.shuffle1Hand()
      n++;
    } while (!handChecker(deal.getHand(0)) && n < maxTries)
    if (n == this.maxTries)
      return undefined
    deal.generationNo = n
    return deal
  }

}
