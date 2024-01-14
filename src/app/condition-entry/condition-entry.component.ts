import {Component, Input} from '@angular/core';
import {ParserService} from "../service/parser.service";
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

  constructor(private conditionParser: ParserService) {
  }

  check() {
    this.doCheck()
    this.sp$.next(this.ok)
    if (this.ok)
      this.hg$.next(this.handChecker)
  }

  doCheck() {
    try {
      this.handChecker = this.conditionParser.parse(this.condition)
      this.ok = true
    } catch (e) {
      this.ok = false
    }
  }

}
