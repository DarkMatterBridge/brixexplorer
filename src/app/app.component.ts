import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IntraCommunicationService} from "./service/intra-communication.service";
import {Board} from "./model/Board";
import {LinHandler} from "./service/lin-handler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./service/app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'brixplorer';


  biddingSystem = false
  configuration = false
  board = false
  condition = false

  constructor(private route: ActivatedRoute, private intraCommunicationService: IntraCommunicationService,
              private linHandler: LinHandler) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);
          let x = params['url'];
          let y = decodeURI(x)
          console.log(y);
          if (y) this.handleLin(y)
        }
      );
  }

  handleLin(x: string) {
    this.board = true
    let board = this.linHandler.getBoard(x)
    this.intraCommunicationService.$boardEmitter.next(board)
  }

  bidding() {
    this.biddingSystem = !this.biddingSystem
  }
}
