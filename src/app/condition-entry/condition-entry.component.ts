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
  @Input()
  sp$ = new Subject<boolean>()

  constructor(private conditionParser: ConditionParser) {
  }

  check(): boolean {
    try {
      this.handChecker = this.conditionParser.parse(this.condition)
    } catch (e) {
      this.ok = false
      this.sp$.next(this.ok)
      return false
    }
    this.ok = true
    this.hg$.next(this.handChecker)
    this.sp$.next(this.ok)
    return true
  }

}
