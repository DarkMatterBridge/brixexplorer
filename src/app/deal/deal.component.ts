import {Component, Input} from '@angular/core';
import {Deal} from "../model/Deal";
import {DealConverter} from "../service/deal-converter";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent {

  @Input()
  players = ["", "", "", ""]

  cards = new Array<Array<Array<string>>>();

  constructor(private converter: DealConverter) {
    this._deal = new Deal()
  }

  _deal: Deal

  @Input()
  get deal() {
    return this._deal;
  }

  set deal(deal: Deal) {
    this._deal = deal;
     this.cards = this.converter.getIndividualCards(deal);
  }

}
