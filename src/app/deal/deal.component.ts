import {Component, Input, OnInit} from '@angular/core';
import {Deal} from "../model/Deal";
import {DealConverter} from "../service/deal-converter";
import {Subject} from "rxjs";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  @Input()
  players = ["", "", "", ""]

  // @Input()
  // subject!: Subject<null>;

  cards = new Array<Array<Array<string>>>();

  constructor(private converter: DealConverter) {
    this._deal = new Deal()
  }

  ngOnInit() {
    // this.subject.subscribe( ()=> this.shuffle())
  }

  _deal: Deal

  @Input()
  get deal() {
    return this._deal;
  }

  set deal(deal: Deal) {
    this._deal = deal;
    this.distributeCards()
  }

  // shuffle() {
  //   this.deal.shuffle()
  //   this.distributeCards()
  // }

  distributeCards() {
    this.cards = this.converter.getIndividualCards(this.deal);
  }


}
