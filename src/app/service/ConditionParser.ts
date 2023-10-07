import {Injectable} from "@angular/core";
import {HandChecker} from "../model/handChecker";
import {Hand} from "../model/Hand";
import {AtomicParser} from "./atomicParser";

@Injectable({
  providedIn: 'root'
})
export class ConditionParser {

  constructor(private atomicParser: AtomicParser) {
  }


  parse(text: string): HandChecker {

    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      return () => true;
    }
    return this.doParseWork(trimmedText);
  }

  doParseWork(text: string): HandChecker {

    try {
      return this.parseForBrackets(text)
    } catch (e) {
    }
    try {
      return this.parseForPrioAnd(text)
    } catch (e) {
    }
    try {
      return this.parseForOr(text)
    } catch (e) {
    }
    try {
      return this.parseForAnd(text)
    } catch (e) {
    }
    try {
      return this.parseForNegation(text)
    } catch (e) {
    }

    try {
      return this.atomicParser.parse(text);
    } catch (e) {
    }

    throw new Error('Expression could not be parsed');
  }

  parseForBrackets(cond: string): HandChecker {
    const r = /^\((.*)\)$/.exec(cond);
    if (r !== null) {
      const f = this.doParseWork(r[1].trim());
      return (hand: Hand) => f(hand);
    }
    throw new Error('Brackets could not be parsed');
  }


  parseForPrioAnd(cond: string): HandChecker {
    const r = /(.+)(&)(.*)/.exec(cond);
    if (r !== null) {
      const f1 = this.doParseWork(r[1].trim());
      const f2 = this.doParseWork(r[3].trim());
      return (hand: Hand) => f1(hand) && f2(hand);
    }
    throw new Error('PrioAnd could not be parsed');
  }

  parseForOr(cond: string): HandChecker {
    const r = /(.+)\s(or|\|)(.*)/.exec(cond);
    if (r !== null) {
      const f1 = this.doParseWork(r[1].trim());
      const f2 = this.doParseWork(r[3].trim());
      return (hand: Hand) => f1(hand) || f2(hand);
    }
    throw new Error('Or could not be parsed');
  }


  parseForAnd(cond: string): HandChecker {
    const r = /(.+)(,|with)(.*)/.exec(cond);
    if (r !== null) {
      const f1 = this.doParseWork(r[1].trim());
      const f2 = this.doParseWork(r[3].trim());
      return (hand: Hand) => f1(hand) && f2(hand);
    }
    throw new Error('And could not be parsed');

  }

  parseForNegation(cond: string): HandChecker {
    const r = /^!(.*)/.exec(cond);
    if (r !== null) {
      const f = this.doParseWork(r[1].trim());
      return (hand: Hand) => !f(hand);
    }
    throw new Error('Negation could not be parsed');
  }
}
