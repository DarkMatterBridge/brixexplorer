import {DBid} from "./DBid";

export class BiddingSequence {

  bids: DBid[] = [];

  latestContractBid: string | undefined;
  dealer = 'W'; // default


  addBid(bid: string): void {
    if (bid === '') {
      this.revertLastBid();
    } else if (this.isBidLegal(bid)) {
      this.bids.push(new DBid(bid, ''));
      if (this.isContractBid(bid)) {
        this.latestContractBid = bid;
      }
    }
  }

  // x is possible if last bid contractBid or contractBid - p - p
  isBidLegal(bid: string): boolean {

    if (this.biddingFinished()) {
      return false;
    }

    if (bid === 'P') {
      return true;
    }
    if (bid === 'X') {
      return this.doubleAllowed();
    }
    if (bid === 'XX') {
      return this.redoubleAllowed();
    }

    if (this.latestContractBid === undefined) {
      return true;
    }

    if (bid === this.latestContractBid) {
      return false;
    }

    if (bid.substr(0, 1) > this.latestContractBid?.substr(0, 1)) {
      return true;
    }

    if (bid.substr(0, 1) < this.latestContractBid?.substr(0, 1)) {
      return false;
    }

    if (bid.substr(1, 1) === 'N') {
      return true;
    }

    if (this.latestContractBid.substr(1, 1) === 'N') {
      return false;
    }

    return bid.substr(1, 1) > this.latestContractBid?.substr(1, 1);


  }

  isContractBid(bid: string): boolean {
    return bid !== 'P' && bid !== 'X' && bid !== 'XX';
  }

  doubleAllowed(): boolean {
    if (this.bids.length === 0) {
      return false;
    }
    if (this.isContractBid(this.bids[this.bids.length - 1].bid)) {
      return true;
    }
    if (this.bids.length < 3) {
      return false;
    }
    return this.isContractBid(this.bids[this.bids.length - 3].bid) &&
      this.bids[this.bids.length - 2].bid === 'P' && this.bids[this.bids.length - 1].bid === 'P';
  }

  redoubleAllowed(): boolean {
    // XX is possible if last bid X or x - p - p
    if (this.bids.length === 0) {
      return false;
    }
    if (this.bids[this.bids.length - 1].bid === 'X') {
      return true;
    }
    if (this.bids.length < 3) {
      return false;
    }
    return this.bids[this.bids.length - 3].bid === 'X' &&
      this.bids[this.bids.length - 2].bid === 'P' && this.bids[this.bids.length - 1].bid === 'P';

  }

  biddingFinished(): boolean {
    return this.bids.length > 3 && this.bids[this.bids.length - 3].bid === 'P' &&
      this.bids[this.bids.length - 2].bid === 'P' && this.bids[this.bids.length - 1].bid === 'P';
  }


  importCanonicalSequence(bids: DBid[]): void {
    this.bids = bids
    console.log('-->' + this.bids);
    this.determineLastContractBid();
  }

  determineLastContractBid(): void {
    const lastBid = this.bids.slice().reverse().find(b => b.bid.isContractBid());
    if (lastBid !== undefined) {
      this.latestContractBid = lastBid.bid;
    } else {
      this.latestContractBid = undefined;
    }
  }

  revertLastBid(): void {
    if (this.bids.length <= 1) {
      this.bids = [];
      this.latestContractBid = undefined;
    } else {
      this.bids = this.bids.slice(0, -1);
      this.determineLastContractBid();
    }
  }

}
