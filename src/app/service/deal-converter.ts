import {Injectable} from '@angular/core';
import {Deal} from "../model/Deal";

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
      // let c = deal.cards.slice(d * 13, d * 13 + 13);
      let c = deal.getSortedHand(d+1);
      cards[d] = [];
      cards[d][0] = c.filter(x => x < 13).map(y => this.value[y%13])
      cards[d][1] = c.filter(x => x > 12 && x < 26).map(y => this.value[y%13])
      cards[d][2] = c.filter(x => x > 25 && x < 39).map(y => this.value[y%13])
      cards[d][3] = c.filter(x => x > 38 ).map(y => this.value[y%13])
    }
    return cards;
  }

}
