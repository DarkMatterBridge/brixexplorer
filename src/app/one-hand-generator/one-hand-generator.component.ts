import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {HandChecker} from "../model/handChecker";
import {Subject} from "rxjs";
import {Deal} from "../model/Deal";
import {DealConverter} from "../service/deal-converter";
import {ConditionEntryComponent} from "../condition-entry/condition-entry.component";
import {Dealer} from "../service/dealer";

@Component({
  selector: 'app-one-hand-generator',
  templateUrl: './one-hand-generator.component.html',
  styleUrls: ['./one-hand-generator.component.scss']
})
export class OneHandGeneratorComponent implements OnInit {

  @ViewChild(ConditionEntryComponent)
  conditionEntryComponent: ConditionEntryComponent | undefined
  maxTries = 1000000;
  recentTries = 0;
  shufflePossible = true;
  cards = new Array<Array<Array<string>>>();
  generated = false;

  // @Output()
  hg$ = new Subject<HandChecker>()
  sp$ = new Subject<boolean>()

  handChecker: HandChecker = () => true;

  deal: Deal = new Deal()

  constructor(private dealer: Dealer,
              private converter: DealConverter) {

  }

  ngOnInit() {
    this.hg$.subscribe(hg => this.handChecker = hg)
    this.sp$.subscribe(sp => this.shufflePossible = sp)
  }

  shuffleOld() {
    if (this.conditionEntryComponent?.ok) {
      let n = 0;
      do {
        this.deal.shuffle1Hand()
        n++;
      } while (!this.conditionEntryComponent.handChecker(this.deal.getHand(0)) && n < this.maxTries)
      this.recentTries = n
      this.generated = true
      if (this.recentTries != this.maxTries)
        this.cards = this.converter.getIndividualCards(this.deal);
      // this.deal.getSortedHand(0)
    }
  }

  shuffle() {
    if (this.conditionEntryComponent?.ok) {
      let generatedDeal = this.dealer.shuffle1(this.conditionEntryComponent.handChecker, this.maxTries)
      if (generatedDeal === undefined) {
      } else {
        this.generated = true
        this.recentTries = generatedDeal.generationNo
        this.deal = generatedDeal
        this.cards = this.converter.getIndividualCards(this.deal);
      }
    }
  }

}
