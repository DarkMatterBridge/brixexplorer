import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bidding-system-panel',
  templateUrl: './bidding-system-panel.component.html',
  styleUrls: ['./bidding-system-panel.component.scss']
})
export class BiddingSystemPanelComponent implements OnInit{

  ran = 0;
  ngOnInit(): void {
    this.ran = Math.random()
  }

}
