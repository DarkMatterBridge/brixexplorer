import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNodeComposite} from "../model/BNodeComposite";
import {BNodeSequence} from "../model/BNodeSequence";
import {BiddingSequence} from "../model/BiddingSequence";

@Component({
  selector: 'app-bnode-sequence-table',
  templateUrl: './bnode-sequence-table.component.html',
  styleUrls: ['./bnode-sequence-table.component.scss']
})
export class BnodeSequenceTableComponent implements OnInit, DoCheck {

  @Output() selectNode = new EventEmitter<BNodeComposite | undefined>();

  @Output() bNodeSequenceEventEmitter = new EventEmitter<BNodeSequence>();

  @Input() bNodeSequence: BNodeSequence;

  numbers = new Array<number>();
  highestBnode: BNodeComposite | undefined;
  interventionPresent = false;
  bnodes: BNodeComposite[] | undefined

  biddingSequence: BiddingSequence = new BiddingSequence()

  constructor() {
    this.bNodeSequence = new BNodeSequence();
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.determineBiddingProperties()
  }

  selectBid(bnc: BNodeComposite): void {
    this.bNodeSequence.setIndexNode(bnc);
    this.selectNode.emit(bnc);
  }

  reset(): void {
    this.bNodeSequence.reset();
    this.selectNode.emit(undefined);
  }

  determineBiddingProperties(): void {
    if (this.bNodeSequence.getLast() != this.highestBnode) {
      this.interventionPresent = this.checkIntervention();

      this.biddingSequence = new BiddingSequence()
      this.biddingSequence.importCanonicalSequence(this.bNodeSequence.buildCanonicalSequence());
      this.biddingSequence.dealer = 'W';

      if (this.interventionPresent) {

      } else {
        let max = this.bNodeSequence.getLength() / 2;
        this.numbers = [];
        for (let i = 0; i < max; i++)
          this.numbers[i] = i;
      }

      this.highestBnode = this.bNodeSequence.getLast();
    }
  }

  checkIntervention(): boolean {
    return !!this.bNodeSequence.compositeNodes.find(bid => bid.bnode.ob)
  }

  numberOwnBids(): number {
    return this.bNodeSequence.compositeNodes.filter(bid => bid.bnode.ob).length
  }


  nums(): number[] {
    let max = this.bNodeSequence.getLength() / 2;
    this.numbers = [];
    for (let i = 0; i < max; i++)
      this.numbers[i] = i;
    return this.numbers

  }


}
