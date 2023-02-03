import {BNode} from './BNode';
import {BridgeSystemManager} from "../service/bridge-system-manager";

export class BiddingSystem {

  rootNode: BNode;
  currentNode: BNode;
  bidList?: Map<number, BNode>;

  constructor(private bsm: BridgeSystemManager) {
    this.setBridgeSystem(this.rootNode = new BNode('Root', [], 'root'));
    this.currentNode = this.rootNode
  }

  public setBridgeSystem(bs: BNode): void {
    this.rootNode = bs;
    this.bsm.determineAndSetHighestId(this.rootNode);
    this.currentNode = this.rootNode;
    this.bidList = this.bsm.getTotalBidList(this.rootNode);
  }

  setElementarySystem(): void {
    this.rootNode.nodes.push(new BNode('opening', [], '', ));
    this.rootNode.nodes.push(new BNode('2C', [], ''));
    let nodes = this.rootNode.nodes[0].nodes;
    nodes.push(new BNode('1C', [],  '15+'));
    nodes.push(new BNode('1D', [],  '10+, 15-, 2+D'));
    nodes = nodes[0].nodes;
    nodes.push(new BNode('1D', [],  '7-'));
    nodes.push(new BNode('1H', [],  '8-11'));

    this.bidList = this.bsm.getTotalBidList(this.rootNode);
  }
}
