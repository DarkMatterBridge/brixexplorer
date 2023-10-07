import {Injectable} from '@angular/core';
import {ConditionParser} from "./ConditionParser";
import {Hand} from "../model/Hand";
import {HandChecker} from '../model/handChecker';

class Testhand implements Hand {
  controls(): number {
    return 0;
  }

  points(): number {
    return 0;
  }

  isBalanced(): boolean {
    return false;
  }

  isSemiBalanced(): boolean {
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConditionParserTesterService {

  re = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  dummyHand = new Testhand()

  testCases = new Map<string, number[][]>([
    ['A,B', [[0, 0, 0], [0, 1, 0], [1, 1, 1]]],
    ['!A,B', [[0, 0, 0], [0, 1, 1], [1, 1, 0]]],
    ['A or B', [[0, 0, 0], [1, 0, 1]]],
    ['!A or B', [[0, 0, 1], [1, 0, 0]]],
    ['A or B, C', [[0, 0, 0, 0], [1, 0, 0, 1], [0, 0, 1, 0], [0, 1, 1, 1]]],
    ['A or (B, C)', [[0, 0, 0, 0], [1, 0, 0, 1], [0, 0, 1, 0], [0, 1, 1, 1]]],
    ['(A or B), C', [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 1]]],
    ['!(A or B), C', [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 1, 1], [0, 1, 1, 0]]],
    ['!(A or !B), C', [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 1]]],
    ['(!(A or B), C)', [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 1, 1], [0, 1, 1, 0]]],
    ['!(!(A or B), C)', [[0, 0, 0, 1], [1, 0, 0, 1], [0, 0, 1, 0], [0, 1, 1, 1]]],
  ])

  // tests = ['A,B' => [0, 0, 0]]

  constructor(private parser: ConditionParser) {
  }

  transform(n: number): string {
    if (n == 1) return 'true';
    return 'false';
  }

  getExpression(text: string, cases: number[]): string {
    let replacedText = text;
    for (let i = 0; i < cases.length - 1; i++) {
      replacedText = replacedText.replaceAll(this.re[i], this.transform(cases[i]));
    }
    return replacedText;
  }

  runTest(text: string, cases: number[]): boolean {
    let replacedText = this.getExpression(text, cases);
    // try {
    let hc: HandChecker = this.callParser(replacedText);
    return hc(this.dummyHand) ? (cases[cases.length - 1] === 1) : cases[cases.length - 1] == 0;
    // } catch (e) {
    //   return false
    // }
  }

  runAllTests(): Map<string, string[]> {

    let result = new Map<string, string[]>()
    this.testCases.forEach((cases, condition) => {
      const nnn: string[] = [];
      cases.forEach((c: number[]) => {
        try {
          if (!this.runTest(condition, c))
            nnn.push(this.getExpression(condition, c) + " => " + c[c.length - 1]);
        } catch(e) {
          nnn.push(this.getExpression(condition, c) + " => " + "Parsing Error");
        }
      })
      result.set(condition, nnn);
    });
    return result;
  }

  callParser(text: string): HandChecker {
    return this.parser.parse(text)
  }

}
