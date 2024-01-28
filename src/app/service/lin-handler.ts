import {Injectable} from '@angular/core';
import {Board} from "../model/Board";

@Injectable({
  providedIn: 'root'
})
export class LinHandler {

  urlstart = 'https://www.bridgebase.com/tools/handviewer.html?bbo=y&lin='

  constructor() {
  }

  getBoard(linString: string): Board {

    const x = linString.replace('https://www.bridgebase.com/tools/handviewer.html?bbo=y&lin=', '').replaceAll('\%2C', ',')
    console.log(x)
    const parsed = this.getParsed(x)

    const hands = this.hands(parsed)
    console.log(this.south(hands))
    let sout = this.south(hands);
    let kk = sout.match(/C(.*)$/);
    if (kk) {
      console.log(kk)
      let ii = kk[0].split(/[SH]/)[1];
      console.log(ii)
      console.log(kk[1])
    }


    console.log(this.west(hands))
    console.log(this.north(hands))
    console.log(this.east(hands))
    return new Board()
  }

  getLinString(board: Board): string {
    return "todo"
  }

  getParsed(linString: string): Map<string, string> {
    const reg = /[\w]{2}\|[^\|]*\|/g;
    var m;
    let map = new Map();
    do {
      m = reg.exec(linString);
      if (m) {
        let [key, value] = this.retrieve_pair(m.toString());
        console.log(key + '/' + value)
        this.addEntry(map, key, value);
      }
    } while (m);
    return map
  }

  retrieve_pair(source: string) {
    let result = source.split("|");
    return [result[0], result[1]];
  }

  addEntry(map: Map<string, []>, key: string, value: string) {
    var x: any;
    if (map.has(key)) {
      x = map.get(key);
      x.push(value);
    } else {
      x = [value];
    }
    map.set(key, x);
  };


  hands(parsed: Map<string, string>): string[] {
    let x = parsed.get("md")
    if (x)
      // return x[0].split("%2C");
      return x[0].split(",");
    return []
  }


  south(hands: string[]): string {
    return hands[0].slice(1);
  }

  west(hands: string[]): string {
    return hands[1];
  }

  north(hands: string[]): string {
    return hands[2];
  }

  east(hands: string[]): string {
    return hands[3];
  }
}
