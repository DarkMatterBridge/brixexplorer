import {Injectable} from '@angular/core';
import {AtomicParser} from "./atomicParser";
import {HandChecker} from "../model/handChecker";
import {RealHand} from "../model/RealHand";

@Injectable({
  providedIn: 'root'
})
export class AtomicParserTesterService {

// @formatter:off
  c2=0; c3=1;
// @formatter:on

  testCases = new Map<string, Map<number[], boolean>>([
      ['bal', new Map<number[], boolean>([
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], false],  // 13000
        [[0, 1, 2, 13, 14, 15, 26, 27, 28, 43, 44, 45, 46], true],
        [[0, 1, 2, 13, 14, 15, 26, 27, 28, 39, 40, 41, 46], true],

        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 42], false],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 48], false],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 49], false],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 50], false],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 51], false],
      ])],
      ['sbal', new Map<number[], boolean>([
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], false],  // 13000
        [[0, 1, 2, 13, 14, 15, 26, 27, 28, 43, 44, 45, 46], true],
        [[0, 1, 2, 13, 14, 15, 26, 27, 28, 39, 40, 41, 46], true],

        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 42], false],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 48], false],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 49], true],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 50], true],
        [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 51], true],
      ])],

    ]
  );

  getTestMap(): Map<string, Map<number[], boolean>> {
    // @formatter:off
    let c2=0; let c3=1;
    // @formatter:on

    return new Map<string, Map<number[], boolean>>([
        ['bal', new Map<number[], boolean>([
          [[c2, c3, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], false],  // 13000
          [[0, 1, 2, 13, 14, 15, 26, 27, 28, 43, 44, 45, 46], true],
          [[0, 1, 2, 13, 14, 15, 26, 27, 28, 39, 40, 41, 46], true],

          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 42], false],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 48], false],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 49], false],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 50], false],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 51], false],
        ])],
        ['sbal', new Map<number[], boolean>([
          [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], false],  // 13000
          [[0, 1, 2, 13, 14, 15, 26, 27, 28, 43, 44, 45, 46], true],
          [[0, 1, 2, 13, 14, 15, 26, 27, 28, 39, 40, 41, 46], true],

          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 42], false],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 48], false],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 49], true],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 50], true],
          [[0, 1, 2, 3, 13, 14, 15, 16, 26, 27, 28, 29, 51], true],
        ])],

      ]
    );

  }

  constructor(private parser: AtomicParser) {
  }

  runAllTests(): Map<string, string[]> {

    let testCases = this.getTestMap();
    let result = new Map<string, string[]>()
    testCases.forEach((cases, condition) => {
      const nnn: string[] = [];
      try {
        let hc = this.parse(condition);
        cases.forEach((value, hand) => {
          if (!this.runTest(hc, hand) == value)
            nnn.push(condition + " - " + hand.toString() + " => " + value);
        })
      } catch (e) {
        nnn.push(condition + " => Parsing error ");
      }
      result.set(condition, nnn);
    });
    return result;
  }

  runTest(hc: HandChecker, handNumbers: number[]): boolean {
    let hand = new RealHand(handNumbers);
    return hc(hand);
  }

  parse(text: string): HandChecker {
    return this.parser.parse(text)
  }


}
