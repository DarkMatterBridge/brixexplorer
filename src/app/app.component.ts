import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./service/app.component.scss']
})
export class AppComponent {
  title = 'brixplorer';


  biddingSystem = false
  configuration = false
  board = false
  condition = false


  bidding() {
    this.biddingSystem = !this.biddingSystem
  }
}
