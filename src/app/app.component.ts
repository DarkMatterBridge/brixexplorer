import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brixplorer';


  biddingSystem = false

  bidding() {
    this.biddingSystem = !this.biddingSystem
  }
}
