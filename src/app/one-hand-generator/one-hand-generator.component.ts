import {Component, OnInit, Output} from '@angular/core';
import {HandChecker} from "../model/handChecker";
import {Subject} from "rxjs";
import {Deal} from "../model/Deal";
import {DealConverter} from "../service/deal-converter";

@Component({
  selector: 'app-one-hand-generator',
  templateUrl: './one-hand-generator.component.html',
  styleUrls: ['./one-hand-generator.component.scss']
})
export class OneHandGeneratorComponent implements OnInit {

  maxTries = 1000;
  shufflePossible = true;
  cards = new Array<Array<Array<string>>>();
  generated = false;

  @Output()
  hg$ = new Subject<HandChecker>()

  handChecker: HandChecker = () => true;

  deal: Deal = new Deal()

  constructor(private converter: DealConverter) {

  }

  ngOnInit() {
    this.hg$.subscribe(hg => this.handChecker = hg)
  }

  shuffle() {
    if (this.shufflePossible) {
      let n = 0;
      do {
        this.deal.shuffle1Hand()
        n++;
        console.log(n);
      } while (!this.handChecker(this.deal.getHand(0)) && n < this.maxTries)
      alert("shuffle finished: " + n)
      this.generated = true
     this.cards =  this.converter.getIndividualCards(this.deal);
      // this.deal.getSortedHand(0)
    }

  }


}
