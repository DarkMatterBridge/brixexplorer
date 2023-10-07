import {Injectable} from "@angular/core";
import {HandChecker} from "../model/handChecker";
import {Hand} from "../model/Hand";

@Injectable({
  providedIn: 'root'
})
export class AtomicParser {

  parse(text: string): HandChecker {

    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      return () => true;
    }
    return this.doParseWork(trimmedText);
  }

  doParseWork(text: string): HandChecker {

    try {
      return this.parseForTrue(text)
    } catch (e) {
    }
    try {
      return this.parseForFalse(text)
    } catch (e) {
    }
    throw new Error('Atomic expression could not be parsed');
  }

  parseForTrue(cond: string): HandChecker {
    const r = /^true$/.exec(cond);
    if (r !== null) {
      return (hand) => true;
    }
    throw new Error('true could not be parsed');
  }

  parseForFalse(cond: string): HandChecker {
    const r = /^false$/.exec(cond);
    if (r !== null) {
      return (hand) => false;
    }
    throw new Error('false could not be parsed');
  }
}
