import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSystemPanelComponent } from './bidding-system-panel.component';

describe('BiddingSystemPanelComponent', () => {
  let component: BiddingSystemPanelComponent;
  let fixture: ComponentFixture<BiddingSystemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingSystemPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingSystemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
