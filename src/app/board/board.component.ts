import { Component } from '@angular/core';
import {Deal} from "../model/Deal";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  deal: Deal = new Deal()
  players = ["A","B","C","D","E"]

  constructor() {
    this.deal.shuffle()
  }

}
