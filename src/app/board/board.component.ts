import {Component, OnInit} from '@angular/core';
import {Deal} from "../model/Deal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  subject = new Subject<null>()
  deal: Deal = new Deal()
  players = ["Adam", "Bree", "Cie", "Dora", "Emil"]

  constructor() {
    this.deal.shuffle()
     }

  shuffle() {
    this.subject.next(null)
  }

}
