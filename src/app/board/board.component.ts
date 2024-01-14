import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Deal} from "../model/Deal";
import {Subject} from "rxjs";
import {ConditionEntryComponent} from "../condition-entry/condition-entry.component";
import {Dealer} from "../service/dealer";
import {DealConverter} from "../service/deal-converter";
import {GeneratedDeal} from "../model/GeneratedDeal";
import {IntraCommunicationService} from "../service/intra-communication.service";

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
  maxTries = 10000000
  players = ["Adam", "Bree", "Cie", "Dora", "Emil"]

  constructor(private dealer: Dealer, private converter: DealConverter, intraCommunicationService: IntraCommunicationService) {
    this.deal.shuffle()
    intraCommunicationService.s.subscribe(x => this.setx(x))
  }

  setx(x: Array<string>) {
    var i = 0
    this.entries?.forEach(entry => {
      entry.condition = x[i]
      i++
    })
  }

  shuffleDirect() {
    if (!this.isShufflePossible())
      return
    this.busy = true
    let generatedDeal = this.dealer.shuffle(this.entries!!.map(t => t.handChecker), this.maxTries)
    this.busy = false
    if (generatedDeal === undefined) {
    } else {
      this.generated = true
      this.recentTries = generatedDeal.generationNo
      this.deal = generatedDeal
    }
  }

  shuffle() {
    if (!this.isShufflePossible())
      return
    this.busy = true

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./../deal-generation.worker', import.meta.url));
      worker.onmessage = ({data}) => {
        let generatedDeal = data.deal
        this.busy = false
        if (generatedDeal === undefined) {
        } else {
          this.generated = true
          this.recentTries = generatedDeal.generationNo
          this.deal = Deal.getDeal(generatedDeal)
        }
      };
      worker.postMessage({conditions: JSON.stringify(this.entries!!.map(t => t.condition)), maxTries: this.maxTries});
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

    // let generatedDeal = this.dealer.shuffle(this.entries!!.map(t => t.handChecker), this.maxTries)

  }

  isShufflePossible(): boolean {
    if (this.entries == undefined) return false
    else return this.entries.map(t => t.ok).reduce((a: boolean, b: boolean) => a && b, true)
  }

}

