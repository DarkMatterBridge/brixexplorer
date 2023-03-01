import {DBid} from "./DBid";

export class BNode extends DBid{

  static highestId: number = -1;
  id: number;
  nodes: BNode[];

  linkedNode: BNode | undefined;
  linkedId: number | undefined;

  ob: boolean | undefined;  // oppenents bidding : true  or undefined

  constructor(bid: string, nodes: BNode[], con: string) {
    super(bid,con);
    this.id = -1;
    this.nodes = nodes;
  }

}
