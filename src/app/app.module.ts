import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {BiddingSystemPanelComponent} from './bidding-system-panel/bidding-system-panel.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {StrainSymbolComponent} from './strain-symbol/strain-symbol.component';
import {HttpClientModule} from "@angular/common/http";
import {BidListComponent} from './bidding-system-panel/bid-list/bid-list.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {MatDialogModule} from '@angular/material/dialog';
import {DialogModule} from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { BidItemComponent } from './bidding-system-panel/bid-list/bid-item/bid-item.component';
import {FormsModule} from "@angular/forms";
import { BnodeSequenceComponent } from './bnode-sequence/bnode-sequence.component';
import { BnodeSequenceTableComponent } from './bnode-sequence-table/bnode-sequence-table.component';
import { BiddingSequenceComponent } from './bidding-sequence/bidding-sequence.component';
import { BidEditComponent } from './bid-edit/bid-edit.component';
import { ConfigMaintenanceComponent } from './config-maintenance/config-maintenance.component';
import { HandComponent } from './hand/hand.component';
import { DealComponent } from './deal/deal.component';
import { DoubleDummyTricksComponent } from './double-dummy-tricks/double-dummy-tricks.component';
import { BoardComponent } from './board/board.component';
import { ConditionEntryComponent } from './condition-entry/condition-entry.component';
import { ConditionsEntryComponent } from './conditions-entry/conditions-entry.component';
import { OneHandGeneratorComponent } from './one-hand-generator/one-hand-generator.component';


@NgModule({
  declarations: [
    AppComponent,
    BiddingSystemPanelComponent,
    StrainSymbolComponent,
    BidListComponent,
    BidItemComponent,
    BnodeSequenceComponent,
    BnodeSequenceTableComponent,
    BiddingSequenceComponent,
    BidEditComponent,
    ConfigMaintenanceComponent,
    HandComponent,
    DealComponent,
    DoubleDummyTricksComponent,
    BoardComponent,
    ConditionEntryComponent,
    ConditionsEntryComponent,
    OneHandGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    DialogModule,
    MatButtonModule,MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
