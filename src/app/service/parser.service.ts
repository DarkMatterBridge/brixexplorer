import {Injectable} from "@angular/core";
import {HandChecker} from "../model/handChecker";
import {ConditionParser} from "./ConditionParser";
import {AtomicParser2} from "./atomicParser2";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  conditionParser = new ConditionParser(new AtomicParser2())
  constructor() {
  }

  parse(text: string): HandChecker {
   return this.conditionParser.parse(text)
  }

}
