import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../bidding-system-panel/bidding-system-panel.component";

@Component({
  selector: 'app-bid-edit',
  templateUrl: './bid-edit.component.html',
  styleUrls: ['./bid-edit.component.scss']
})
export class BidEditComponent {

  constructor(
    public dialogRef: MatDialogRef<BidEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
