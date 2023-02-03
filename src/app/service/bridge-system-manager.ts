import { Injectable } from '@angular/core';
import {BNode} from "../model/BNode";

@Injectable({
  providedIn: 'root'
})
export class BridgeSystemManager {  // the future Bridge-System ! 2023 todo

  baseNode: BNode =  new BNode("base", [], "")   // this is the global bridge system root noe!

  constructor() { }

  addNode(node: BNode, subNode: BNode): void {
    node.nodes.push(subNode);
  }

  addBid(node: BNode, bid: string, con: string): BNode {
    const b = new BNode(bid, new Array<BNode>(), con);
    this.addNode(node, b);
    return b;
  }

  getNode(bidList: Map<number, BNode>, id: number): BNode | undefined {
    return bidList.get(id);
  }

  getBidAtCurrentNode(node: BNode, id: number | undefined): BNode {
    const x = node.nodes.find(bid => bid.id === id);
    if (x !== undefined) {
      return x;
    } else {
      throw new Error('given id ' + id + ' undefined');
    }
  }

  determineHighestId(node: BNode): number {
    return node.nodes.length === 0 ? -1 : Math.max(...node.nodes.map(b => Math.max(b.id, this.determineHighestId(b))));
  }

  determineAndSetHighestId(node: BNode): number {
    BNode.highestId = this.determineHighestId(node);
    return BNode.highestId;
  }

  determineLinkedNodes(bidList: Map<number, BNode>): BNode[] {
    return [...bidList].filter(([_, node]) => node.linkedId !== undefined).map(([_, b]) => b);
  }

  connectLinkedNodesW(linkedNodes: BNode[], bidList: Map<number, BNode>): void {
//    alert("linked nodes: "+ linkedNodes.length);
    for (const nwl of linkedNodes) {
      nwl.linkedNode = bidList.get(nwl.linkedId || -1);
      // alert(nwl.linkedId+" "+nwl.linkedNode?.bid);
    }
  }

  makeUsable(bn: BNode): void {
    const bidList = this.getTotalBidList(bn);
    this.connectLinkedNodesW(this.determineLinkedNodes(bidList), bidList);
    this.determineAndSetHighestId(bn);
    this.baseNode = bn;
  }

  determineLinkedNodesDirect(node: BNode): BNode[] {
    const linkedNodes = new Array<BNode>();
    if (node.linkedId !== undefined) {
      linkedNodes.push(node);
    }
    if (node.nodes.length > 0) {
      return linkedNodes.concat(node.nodes.map(b => this.determineLinkedNodesDirect(b))
        .reduce((accumulator, value) => accumulator.concat(value), []));
    } else {
      return linkedNodes;
    }
  }

  connectLinkedNodesDirect(node: BNode, bidList: Map<number, BNode>): void {
    this.connectLinkedNodesWorker(bidList, this.determineLinkedNodesDirect(node));
  }

  connectLinkedNodesWorker(bidlist: Map<number, BNode>, nodesWithLinks: BNode[]): void {
    for (const nwl of nodesWithLinks) {
      nwl.linkedNode = bidlist.get(nwl.id);
    }
  }

  getTotalBidList(node: BNode): Map<number, BNode> {
    if (node.nodes.length > 0) {
      const nm = new Map();
      nm.set(node.id, node);
      return node.nodes.map(b => this.getTotalBidList(b))
        .reduce((accumulator, value) => new Map([...accumulator, ...value]), nm);
    } else {
      return new Map([[node.id, node]]);
    }
  }

  getTotalBidSequenceList(node: BNode, sequence: string = ''): string[] {
    const nm = [sequence];
    if (node.nodes.length > 0) {
      return node.nodes.map(b => this.getTotalBidSequenceList(b, sequence + '-' + b.bid))
        .reduce((accumulator, value) => [...accumulator, ...value], nm);
    } else {
      return nm;
    }
  }

  getTotalBidSequenceMap(node: BNode,  sequence: string= ''): Map<BNode, string> {
    const nm = new Map();
    nm.set(node, sequence);
    if (node.nodes.length > 0) {
      return node.nodes.map(b => this.getTotalBidSequenceMap(b, sequence + '-' + b.bid))
        .reduce((accumulator, value) => new Map( [...accumulator, ...value]), nm);
    } else {
      return nm;
    }
  }


  getAllLinkedNodes(map: Map<number, BNode>): Array<[number, BNode]> {
    const a = Array.from(map);
    const b = a.filter(([c, d]) => d.linkedId !== undefined);
    console.log(b);
    const linkedIds = b.map(([c, d]) => d.linkedNode);
    console.log(linkedIds);
    return b;
  }

  isALinkedNodeIn(bnode: BNode, baseNoade: BNode): boolean {
    const linkedNodes = this.getAllLinkedNodes(this.getTotalBidList(baseNoade));
    const linkedIds = linkedNodes.map(([c, d]) => d.linkedNode!!.id);
    return linkedIds === undefined || (linkedIds.includes(bnode.id));
  }

  isALinkedNodeInSystem(bnode: BNode): boolean {
    return this.baseNode !== undefined && this.isALinkedNodeIn(bnode, this.baseNode);
  }

  persistNode(bnode: BNode): void {
    BNode.highestId += 1;
    bnode.id = BNode.highestId;
  }

  materializeLinkeNode(bnode: BNode): void {
    if (bnode.linkedNode) {
      // bnode.nodes = [...bnode.linkedNode.nodes];
      bnode.nodes = this.copyBNode(bnode.linkedNode).nodes;
      bnode.linkedNode = undefined;
      bnode.linkedId = undefined;
    }
  }

  copyBNode(bnode: BNode): BNode {
    return JSON.parse(this.transformToJson(bnode)) as BNode;
  }

  transformToJson(bnode: BNode): string {
    return JSON.stringify(bnode, ['id', 'bid', 'con', 'desc', 'nodes', 'ob', 'linkedId', 'linkedNode']);
  }


}
