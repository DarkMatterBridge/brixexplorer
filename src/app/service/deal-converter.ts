import {Injectable} from '@angular/core';
import {Deal} from "../model/Deal";
import {DealHand} from "../model/DealHand";

@Injectable({
  providedIn: 'root'
})
export class DealConverter {

  value = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  constructor() {
  }

  getIndividualCards(deal: Deal) {
    let cards: string[][][];
    cards = new Array<Array<Array<string>>>();

    for (let d = 0; d < 4; d++) {
      let c = deal.getSortedHand(d);
      // cards[d] = [];
      // cards[d][0] = c.filter(x => x < 13).map(y => this.value[y % 13])
      // cards[d][1] = c.filter(x => x > 12 && x < 26).map(y => this.value[y % 13])
      // cards[d][2] = c.filter(x => x > 25 && x < 39).map(y => this.value[y % 13])
      // cards[d][3] = c.filter(x => x > 38).map(y => this.value[y % 13])
      cards[d] = this.getHandArray(c)
    }
    return cards;
  }

  getHandArray(cardsInHand: number[]): Array<Array<string>> {
    let cards = [];
    cards[0] = cardsInHand.filter(x => x < 13).map(y => this.value[y % 13])
    cards[1] = cardsInHand.filter(x => x > 12 && x < 26).map(y => this.value[y % 13])
    cards[2] = cardsInHand.filter(x => x > 25 && x < 39).map(y => this.value[y % 13])
    cards[3] = cardsInHand.filter(x => x > 38).map(y => this.value[y % 13])
    return cards;
  }

  constructDealStringForDDA(deal: Deal): string {
    const separator = 'x'
    let cards = this.getIndividualCards(deal)
    return 'W:' + this.getHandString(cards[0]) + separator
      + this.getHandString(cards[1])
      + separator + this.getHandString(cards[2])
      + separator + this.getHandString(cards[3])
  }



  getHandString(cards: string[][]) {
    return cards[3].join("") + "." + cards[2].join("") + "." + cards[1].join("") + "." + cards[0].join("");
  }

}
