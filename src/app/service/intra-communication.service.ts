import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BNodeSequence} from "../model/BNodeSequence";
import {DBid} from "../model/DBid";


@Injectable({
  providedIn: 'root'
})
export class IntraCommunicationService {

  s = new Subject<Array<string>>()

  constructor() {
  }

  push(bns: Array<DBid>): void {
    this.s.next(this.transform(bns))
  }

  transform(bids: Array<DBid>): Array<string> {
    let condtions =  new Array<string>()
    condtions.push("20+")
    return condtions
  }

}

