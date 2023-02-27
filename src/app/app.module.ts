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
import { BidItemComponent } from './bidding-system-panel/bid-list/bid-item/bid-item.component';
import {FormsModule} from "@angular/forms";
import { BnodeSequenceComponent } from './bnode-sequence/bnode-sequence.component';


@NgModule({
  declarations: [
    AppComponent,
    BiddingSystemPanelComponent,
    StrainSymbolComponent,
    BidListComponent,
    BidItemComponent,
    BnodeSequenceComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
