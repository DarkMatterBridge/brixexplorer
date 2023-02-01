import {Component, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {BNodeComposite} from "../model/BNodeComposite";
import {BNodeSequence} from "../model/BNodeSequence";
import {BiddingSystem} from "../model/BiddingSystem";
import {BridgeSystemManager} from "../service/bridge-system-manager";
import {Subject} from "rxjs";

@Component({
  selector: 'app-bidding-system-panel',
  templateUrl: './bidding-system-panel.component.html',
  styleUrls: ['./bidding-system-panel.component.scss']
})
export class BiddingSystemPanelComponent implements OnInit {

  baseNode: BNode = new BNode("base", [], "")
  bnc: BNodeComposite = new BNodeComposite(this.baseNode);

  subject: Subject<BNodeComposite> = new Subject<BNodeComposite>();
  bridgeSystem: BiddingSystem;

  uploadSubject: Subject<BNode> = new Subject<BNode>();

  linkableBnodes: BNode[] = [];

  bNodeSequence: BNodeSequence = new BNodeSequence();

  bNodeSequenceForDealView: BNodeSequence = new BNodeSequence();

  editable = false;
  bidEditable = false;
  noNodes = 0;

  ran = 0;

  constructor(private bsm: BridgeSystemManager,
              // private fileService: FileService,
              // private conditionManager: ConditionManager
  ) {
    this.bridgeSystem = new BiddingSystem(bsm);
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnodeFromBelow(b));
    this.resetSystem();
    // this.loadFromLocalStorage();
    this.uploadSubject.subscribe(bn => this.setSystem(bn));
    // this.fileService.$subject
    //   .subscribe((bs) =>  this.bnc = this.bNodeSequence.importBiddingSequence(this.bsm, bs, this.conditionManager));
  }

  setSystem(baseNode: BNode): void {
    this.bsm.makeUsable(baseNode);
    this.baseNode = baseNode;
    this.bnc = new BNodeComposite(baseNode);
  }

  // called from event in included Bnode-Sequence.component

  setBnode(bnc?: BNodeComposite): void {
    if (bnc === undefined) {
      this.bnc = new BNodeComposite(this.baseNode);
    } else {
      this.bnc = bnc; // todo and what about basenode ? 2023
    }
  }

  // 2) called from subject event, i.e. from included bid list below

  setBnodeFromBelow(bnc?: BNodeComposite): void {
    if (bnc === undefined) { // Does this ever occur?
      this.bnc = new BNodeComposite(this.baseNode);
      this.bNodeSequence.reset(); // instead of this.reset() ;
    } else {
      this.bNodeSequence.addNode(bnc);
      this.bnc = bnc;
    }
  }

  getStatistics(): void {
    const hid =
      this.bsm.determineAndSetHighestId(this.baseNode);
    const nobids =
      this.bsm.getTotalBidList(this.baseNode).size;

    alert('Highest ID: ' + hid + ' No of bids: ' + nobids);
  }

  resetSystem(): void {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.resetBidding();
  }

  loadElementarySystem(): void {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.bridgeSystem.setElementarySystem();
    this.setSystem(this.bridgeSystem.rootNode);
    this.resetBidding();
  }

  // saveIntoLocalStorage(): void {
  //   const name = 'precision';
  //   this.fileService.saveIntoLocalStorage(name, this.baseNode);
  // }

  // loadFromLocalStorage(): void {
  //   const name = 'precision';
  //   const b = this.fileService.loadFromLocalStorage(name);
  //   if (b) {
  //     this.setSystem(b);
  //     this.resetBidding();
  //   }
  // }

  // downloadSystem(): void {
  //   const name = 'precision';
  //   this.fileService.downloadSystem(name, this.baseNode);
  // }

  // showRawSystem(): void {
  //   const name = 'precision';
  //   this.fileService.showRawSystem(name, this.baseNode);
  // }

  // showAllBids(): void {
  //   const bidList = this.bsm.getTotalBidSequenceMap(this.baseNode);
  //   const bidList2 = this.bsm.getTotalBidSequenceList(this.baseNode);
  //   let text = '<p>';
  //   bidList.forEach((sequence, bn) => text = text + bn.id.toString() + ': ' + sequence + '<\p><p>');
  //   text = text + '</p>';
  //   const text2 = bidList2.join('<\p><p>');
  //   this.fileService.showInNewWindow('t1', text);
  //   // this.fileService.showInNewWindow('t2', text2);
  //   console.log('<p>' + text + '<\p>');
  //   // const bidList = this.bsm.getTotalBidList(this.baseNode);
  //   // let bl = Array.from(bidList).map(([x, y]) => x + ":" + y.bid + "->" + y.con);
  //   // let text = bl.join('          \n');
  //   // this.fileService.showInNewWindow(text);
  //   // console.log(this.bsm.getAllLinkedNodes(bidList));
  // }

  // processFile(input: HTMLInputElement): void {  // TODO Bug > does not triggger if file name did not change
  //   const files = input.files;
  //   if (files) {
  //     this.fileService.uploadSystem(files[0], this.uploadSubject);
  //   }
  // }

  resetBidding(): void {
    this.baseNode = this.bridgeSystem.rootNode;
    this.bnc = new BNodeComposite(this.baseNode);
    this.bNodeSequence.reset();
  }

  ///
  markAsLinkable(): void {
    this.linkableBnodes.push(this.bnc.bnode);
  }

  linkBnode(linkableBnode: BNode | undefined): void {
    if (linkableBnode) {
      this.bnc.bnode.linkedNode = linkableBnode;
      this.bnc.bnode.linkedId = linkableBnode.id;
    }
    this.bnc = new BNodeComposite(this.bnc.bnode, this.bnc.bid, this.bnc.lastContractBid,
      this.bnc.contextualizedCondition, this.bnc.handAttributes); // to trigger the change detection on child component
  }

  calcStatistics(): void {
    this.noNodes = this.bsm.getTotalBidList(this.bnc.bnode).size;
  }

  showStatistics(): number {
    this.noNodes = this.bsm.getTotalBidList(this.bnc.bnode).size;
    alert('No of Subnodes: ' + this.noNodes);
    return this.noNodes;
  }

  // activateDealView2(bns: BNodeSequence): void {
  //   this.dealViewActivated = true;
  //   this.bNodeSequenceForDealView = {...bns} as BNodeSequence; // Attention> this spread construct removes all functions
  // }

  // triggerFileUpload(): void {
  //   const el: HTMLElement = this.fileInput.nativeElement;
  //   el.click();
  // }

  editBid(): void {
    if (this.editable) {
      this.bidEditable = true;
    }
  }

}
