import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Deal} from "../model/Deal";
import {Subject} from "rxjs";
import {ConditionEntryComponent} from "../condition-entry/condition-entry.component";
import {Dealer} from "../service/dealer";
import {DealConverter} from "../service/deal-converter";
import { setTimeout } from "timers/promises";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @ViewChildren(ConditionEntryComponent) entries: QueryList<ConditionEntryComponent> | undefined
  subject = new Subject<null>()
  deal: Deal = new Deal()
  generated = false
  recentTries = 0
  busy = false
  maxTries = 5000000
  players = ["Adam", "Bree", "Cie", "Dora", "Emil"]

  constructor(private dealer: Dealer, private converter: DealConverter) {
    this.deal.shuffle()
  }

  async shuffle() {
    if (!this.isShufflePossible())
      return
    this.busy = true
    await setTimeout(5000);

    let generatedDeal = this.dealer.shuffle(this.entries!!.map(t => t.handChecker), this.maxTries)
    this.busy = false
    if (generatedDeal === undefined) {
    } else {
      this.generated = true
      this.recentTries = generatedDeal.generationNo
      this.deal = generatedDeal
    }

  }

  isShufflePossible(): boolean {
    if (this.entries == undefined) return false
    else return this.entries.map(t => t.ok).reduce((a: boolean, b: boolean) => a && b, true)
  }

}
