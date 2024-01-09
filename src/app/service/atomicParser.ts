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
    try {
      return this.parseForBalanced(text)
    } catch (e) {
    }
    try {
      return this.parseForSemiBalanced(text)
    } catch (e) {
    }
    try {
      return this.parseForPlusPoints(text)
    } catch (e) {
    }
    try {
      return this.parseForMinusPoints(text)
    } catch (e) {
    }
    try {
      return this.parseForInterval(text)
    } catch (e) {
    }
    try {
      return this.parseForNoCardsInSuit(text)
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

  parseForBalanced(cond: string): HandChecker {
    const a = /^(bal)$/.exec(cond);
    if (a !== null) {
      return (hand: Hand) => hand.isBalanced();
    }
    throw new Error('bal could not be parsed');
  }

  parseForSemiBalanced(cond: string): HandChecker {
    const a = /^(sbal|semibal)$/.exec(cond);
    if (a !== null) {
      return (hand: Hand) => hand.isSemiBalanced();
    }
    throw new Error('bal could not be parsed');
  }

  parseForPlusPoints(cond: string): HandChecker {
    const a = /^(\d+)\+$/.exec(cond);
    if (a !== null) {
      const lp = +a[1];
      return (hand: Hand) => hand.points() >= lp;
    }
    throw new Error('+ could not be parsed');
  }

  parseForMinusPoints(cond: string): HandChecker {
    const a = /^(\d+)\-$/.exec(cond);
    if (a !== null) {
      const hp = +a[1];
      return (hand: Hand) => hand.points() <= hp;
    }
    throw new Error('+ could not be parsed');
  }

  parseForInterval(cond: string): HandChecker {
    const a = /(\d+)\-(\d+)/.exec(cond);
    if (a !== null) {
      const lp = +a[1];
      const hp = +a[2];
      return (hand: Hand) => (hand.points() >= +a[1]) && (hand.points() <= +a[2]);
    }
    throw new Error('Interval could not be parsed');
  }

  parseForNoCardsInSuit(cond: string): HandChecker {
    const a = /^(\d{1,2})(\+|\-)?(S|H|D|C|a|any|M|m)$/.exec(cond.trim());
    if (a !== null) {
      const length = +a[1];
      const suit = a[3];
      if (suit === 'a' || suit === 'any') {
        if (a[2] === '+') {
          return (hand: Hand) => hand.cardsInSuit(0) >= length ||
            hand.cardsInSuit(1) >= length ||
            hand.cardsInSuit(2) >= length ||
            hand.cardsInSuit(3) >= length;
        }
        if (a[2] === '-') {
          return (hand: Hand) => hand.cardsInSuit(0) <= length ||
            hand.cardsInSuit(1) <= length ||
            hand.cardsInSuit(2) <= length ||
            hand.cardsInSuit(3) <= length;
        }
        if (a[2] === undefined) {
          return (hand: Hand) => hand.cardsInSuit(0) === length ||
            hand.cardsInSuit(1) === length ||
            hand.cardsInSuit(2) === length ||
            hand.cardsInSuit(3) === length;
        }
      }
      if (suit === 'M') {
        if (a[2] === '+') {
          return (hand: Hand) => (hand.cardsInSuit(2) >= length ||
            hand.cardsInSuit(3) >= length);
        } else if (a[2] === '-') {
          return (hand: Hand) => (hand.cardsInSuit(2) <= length ||
            hand.cardsInSuit(3) <= length);
        } else {
          return (hand: Hand) => (hand.cardsInSuit(2) === length ||
            hand.cardsInSuit(3) === length);
        }
      }
      if (suit === 'm') {
        if (a[2] === '+') {
          return (hand: Hand) => (hand.cardsInSuit(0) >= length ||
            hand.cardsInSuit(1) >= length);
        }
        if (a[2] === '-') {
          return (hand: Hand) => (hand.cardsInSuit(0) <= length ||
            hand.cardsInSuit(1) <= length);
        }
        return (hand: Hand) => (hand.cardsInSuit(0) === length ||
          hand.cardsInSuit(1) === length);
      }
      const suitNo = this.determineSuitNo(suit);

      if (a[2] === '+') {
        return (hand: Hand) => hand.cardsInSuit(suitNo) >= length;
      } else if (a[2] === '-') {
        return (hand: Hand) => hand.cardsInSuit(suitNo) <= length;
      } else {
        return (hand: Hand) => hand.cardsInSuit(suitNo) === length;
      }
    }
    throw new Error('Number of Cards in Suit could not be parsed');
  }

  private determineSuitNo(suit: string): number {
    switch (suit) {
      case 'S':
        return 3;
      case 'H':
        return 2;
      case 'D':
        return 1;
      case 'C':
        return 0;
      default:
        return 3;
    }
  }
}
