import {Component, Input} from '@angular/core';
import {ConditionParser} from "../service/ConditionParser";
import {HandChecker} from "../model/handChecker";
import {Subject} from "rxjs";

@Component({
  selector: 'app-condition-entry',
  templateUrl: './condition-entry.component.html',
  styleUrls: ['./condition-entry.component.scss']
})
export class ConditionEntryComponent {

  condition = ""
  handChecker: HandChecker = () => true;
  ok = true

  @Input()
  hg$ = new Subject<HandChecker>()

  constructor(private conditionParser: ConditionParser) {
  }

  check(): boolean {
    try {
      this.handChecker = this.conditionParser.parse(this.condition)
    } catch (e) {
      this.ok = false
      return false
    }
    this.ok = true
    this.hg$.next(this.handChecker)
    return true
  }

}
