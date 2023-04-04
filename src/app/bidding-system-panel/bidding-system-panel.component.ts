import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BNode} from "../model/BNode";
import {BNodeComposite} from "../model/BNodeComposite";
import {BNodeSequence} from "../model/BNodeSequence";
import {BridgeSystemManager} from "../service/bridge-system-manager";
import {Subject} from "rxjs";
import {FileService} from "../service/file.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BidEditComponent} from "../bid-edit/bid-edit.component";

export interface DialogData {
  bid: string;
  condition: string;
  description: string;
  oppsBid: boolean;
}


@Component({
  selector: 'app-bidding-system-panel',
  templateUrl: './bidding-system-panel.component.html',
  styleUrls: ['./bidding-system-panel.component.scss']
})
export class BiddingSystemPanelComponent implements OnInit {

  baseNode: BNode = new BNode("base", [], "")
  bnc: BNodeComposite = new BNodeComposite(this.baseNode);

  subject: Subject<BNodeComposite> = new Subject<BNodeComposite>();
  // bridgeSystem: BiddingSystem;

  uploadSubject: Subject<BNode> = new Subject<BNode>();

  linkableBnodes: BNode[] = [];

  bNodeSequence: BNodeSequence = new BNodeSequence();

  bNodeSequenceForDealView: BNodeSequence = new BNodeSequence();

  editable = false;
  bidEditable = false;
  noNodes = 0;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLElement>;

  constructor(private bridgeSystemM: BridgeSystemManager,
              private fileService: FileService,
              public dialog: MatDialog
              // private conditionManager: ConditionManager
  ) {
    // this.bridgeSystem = new BiddingSystem(bsm);
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnodeFromBelow(b));
    this.resetSystem();
    this.loadFromLocalStorage();
    this.uploadSubject.subscribe(bn => this.setSystem(bn));
    // this.fileService.$subject
    //   .subscribe((bs) =>  this.bnc = this.bNodeSequence.importBiddingSequence(this.bsm, bs, this.conditionManager));
  }

  setSystem(baseNode: BNode): void {
    this.bridgeSystemM.makeUsable(baseNode);
    this.baseNode = this.bridgeSystemM.baseNode;
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
      this.bridgeSystemM.determineAndSetHighestId(this.baseNode);
    const nobids =
      this.bridgeSystemM.getTotalBidList(this.baseNode).size;

    alert('Highest ID: ' + hid + ' No of bids: ' + nobids);
  }

  resetSystem(): void {
    // this.bridgeSystem = new BiddingSystem(this.bsm);
    this.resetBidding();
  }

  loadElementarySystem(): void { //TODO 2023
    // this.bridgeSystem = new BiddingSystem(this.bsm);
    // this.bridgeSystem.setElementarySystem();
    // this.setSystem(this.bridgeSystem.rootNode);
    this.resetBidding();
  }


  resetBidding(): void {
    // this.baseNode = this.bridgeSystem.rootNode;
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
    this.noNodes = this.bridgeSystemM.getTotalBidList(this.bnc.bnode).size;
  }

  showStatistics(): number {
    this.noNodes = this.bridgeSystemM.getTotalBidList(this.bnc.bnode).size;
    alert('No of Subnodes: ' + this.noNodes);
    return this.noNodes;
  }

  activateDealView2(bns: BNodeSequence): void {
    // this.dealViewActivated = true; todo
    this.bNodeSequenceForDealView = {...bns} as BNodeSequence; // Attention> this spread construct removes all functions
  }

  editBid(): void {
    if (this.editable) {
      this.bidEditable = true;
    }
  }

  editBidNew(): void {
    const dialogRef = this.dialog.open(BidEditComponent, {
      data: {
        bid: this.bnc.bnode.bid, description: this.bnc.bnode.desc,
        condition: this.bnc.bnode.con, oppsBid: this.bnc.bnode.ob
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bnc.bnode.bid = result.bid
      this.bnc.bnode.desc = result.description
      this.bnc.bnode.con = result.condition
      this.bnc.bnode.ob = result.oppsBid
    });
  }


//

  saveIntoLocalStorage(): void {
    const name = 'precision';
    this.fileService.saveIntoLocalStorage(name, this.baseNode);
  }

  loadFromLocalStorage(): void {
    const name = 'precision';
    const b = this.fileService.loadFromLocalStorage(name);
    if (b) {
      this.setSystem(b);
      this.resetBidding();
    }
  }

  downloadSystem(): void {
    const name = 'precision';
    this.fileService.downloadSystem(name, this.baseNode);
  }

  showRawSystem(): void {
    const name = 'precision';
    this.fileService.showRawSystem(name, this.baseNode);
  }

  showAllBids(): void {
    const bidList = this.bridgeSystemM.getTotalBidSequenceMap(this.baseNode);
    const bidList2 = this.bridgeSystemM.getTotalBidSequenceList(this.baseNode);
    let text = '<p>';
    bidList.forEach((sequence, bn) => text = text + bn.id.toString() + ': ' + sequence + '<\p><p>');
    text = text + '</p>';
    const text2 = bidList2.join('<\p><p>');
    this.fileService.showInNewWindow('t1', text);
    // this.fileService.showInNewWindow('t2', text2);
    console.log('<p>' + text + '<\p>');
    // const bidList = this.bsm.getTotalBidList(this.baseNode);
    // let bl = Array.from(bidList).map(([x, y]) => x + ":" + y.bid + "->" + y.con);
    // let text = bl.join('          \n');
    // this.fileService.showInNewWindow(text);
    // console.log(this.bsm.getAllLinkedNodes(bidList));
  }

  processFile(input: HTMLInputElement): void {  // TODO Bug > does not triggger if file name did not change
    const files = input.files;
    if (files) {
      this.fileService.uploadSystem(files[0], this.uploadSubject);
    }
  }

  triggerFileUpload(): void {
    const el: HTMLElement = this.fileInput.nativeElement;
    el.click();
  }


}
