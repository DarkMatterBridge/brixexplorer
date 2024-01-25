import {Component, Input} from '@angular/core';
import {HttpCallService} from "../service/http-call.service";
import {Deal} from "../model/Deal";
import {DealConverter} from "../service/deal-converter";
import {BridgeRespsonse} from "../model/BridgeRespsonse";

@Component({
  selector: 'app-double-dummy-tricks',
  templateUrl: './double-dummy-tricks.component.html',
  styleUrls: ['./double-dummy-tricks.component.scss']
})
export class DoubleDummyTricksComponent {
  get deal(): Deal | undefined {
    return this._deal;
  }

  @Input()
  set deal(value: Deal | undefined) {
    this.ddtricks = ''
    this._deal = value;
  }

  ddtricks = ''; // contains all tricks as string for each direction/strain
  ddTrickTable: string[][] = [];
  direction = ['N', 'S', 'E', 'W'];

 private _deal: Deal | undefined

  constructor(private caller: HttpCallService, private converter: DealConverter) {
  }

  getRemoteDDA() {
    alert(this._deal)
    if (this._deal) {
      this.caller.getDDA(this.converter.constructDealStringForDDA(this._deal)).subscribe(
        response => this.showResponse(response)
      )
    }
  }

  showResponse(response: string): void {
    const br = JSON.parse(response) as BridgeRespsonse;
    alert(response);
    this.ddtricks = br.sess.ddtricks;
    this.parseDDTricks();
  }

  parseDDTricks(): void {
    for (let i = 0; i < 4; i++) {
      this.ddTrickTable[i] = [];
      for (let j = 0; j < 5; j++) {
        this.ddTrickTable[i][j] = this.ddtricks.charAt(i * 5 + j);
        if (this.ddTrickTable[i][j] === 'a') {
          this.ddTrickTable[i][j] = '10';
        }
        if (this.ddTrickTable[i][j] === 'b') {
          this.ddTrickTable[i][j] = '11';
        }
        if (this.ddTrickTable[i][j] === 'c') {
          this.ddTrickTable[i][j] = '12';
        }
        if (this.ddTrickTable[i][j] === 'd') {
          this.ddTrickTable[i][j] = '13';
        }
      }
    }
  }


}
