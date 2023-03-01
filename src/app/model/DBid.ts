export class DBid { // A Descriptive Bid

  bid: string;
  desc: string | undefined;
  con: string;

  constructor(bid: string, con: string) {
    this.bid = bid;
    this.con = con;
  }

}
