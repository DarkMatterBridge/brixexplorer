import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BNodeSequence} from "../model/BNodeSequence";
import {DBid} from "../model/DBid";
import {elementSelectors} from "@angular/cdk/schematics";
import {Board} from "../model/Board";


@Injectable({
  providedIn: 'root'
})
export class IntraCommunicationService {

  $conditionsEmitter = new Subject<Array<string>>()
  $boardEmitter = new Subject<Board>()

  constructor() {
  }

  pushDbids(bns: Array<DBid>): void {
    this.$conditionsEmitter.next(this.transform(bns))
  }

  pushBoard(board: Board): void {
    this.$boardEmitter.next(board)
  }


  transform(bids: Array<DBid>): Array<string> {
    return this.importNew(bids.map(x => x.con), "N")
  }

  importNew(dealConditionSequence: string[], dealer: string): string[] {
    let directionConditions: string[] = ["", "", "", ""]
    const map = new Map([['S', 0], ['W', 1], ['N', 2], ['E', 3]]);
    const x = map.get(dealer);
    let start = 0;
    if (x !== undefined) {
      start = x;
    }
    if (dealConditionSequence.length > 0) {
      for (let i = 0; i < dealConditionSequence.length; i++) {
        if (directionConditions[(i + start) % 4] === '')
          directionConditions[(i + start) % 4] = dealConditionSequence[i]
        else
          directionConditions[(i + start) % 4] += ' & ' + dealConditionSequence[i];
      }
    }
    return directionConditions;
  }

}

