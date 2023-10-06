export class DBid { // A Descriptive Bid

  bid: string;
  desc: string | undefined;
  con: string;
  settings: string | undefined;

  constructor(bid: string, con: string) {
    this.bid = bid;
    this.con = con;
  }

}
