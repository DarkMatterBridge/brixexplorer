import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent {

  symbols = ['♣', '♦', '♥', '♠'].reverse();
  suits = ['S', 'H', 'D', 'C'];

  @Input()
  cards = new Array<Array<string>>();
  // hand = new DealHand([]);

  constructor() { }

  ngOnInit(): void {
  }

  // getCards(suit:number) : number[]{
  //   return[];
  // }

  sort() {
  }


}
