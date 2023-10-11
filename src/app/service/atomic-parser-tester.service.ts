import {Injectable} from '@angular/core';
import {AtomicParser} from "./atomicParser";
import {HandChecker} from "../model/handChecker";
import {DealHand} from "../model/DealHand";

@Injectable({
  providedIn: 'root'
})
export class AtomicParserTesterService {

  getTestMap(): Map<string, Map<number[], boolean>> {
    // @formatter:off
    let c2=0;let c3=1;let c4=2;let c5=3;let c6=4;let c7=5;let c8=6;let c9=7;let ct=8;let cj=9;let cq=10;let ck=11;let ca=12;
    let d2=13;let d3=14;let d4=15;let d5=16;let d6=17;let d7=18;let d8=19;let d9=20;let dt=21;let dj=22;let dq=23;let dk=24;let da=25;
    let h2=26;let h3=27;let h4=28;let h5=29;let h6=30;let h7=31;let h8=32;let h9=33;let ht=34;let hj=35;let hq=36;let hk=37;let ha=38;
    let s2=39;let s3=40;let s4=41;let s5=42;let s6=43;let s7=44;let s8=45;let s9=46;let st=47;let sj=48;let sq=49;let sk=50;let sa=51;
    // @formatter:on

    return new Map<string, Map<number[], boolean>>([
        ['bal', new Map<number[], boolean>([
          [[c2, c3, c4, c5, c6, c7, c8, c9, ct, cj, cq, ck, ca], false],
          [[c2,c3, c4, d2, d3, d4, h2, h3, h4, s3, s4, s5, s7], true],
          [[c2, c3, c4, d2, d3, d4, h2, h3, h4, s2, s3, s4, sk], true],

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
    let hand = new DealHand(handNumbers);
    return hc(hand);
  }

  parse(text: string): HandChecker {
    return this.parser.parse(text)
  }


}
