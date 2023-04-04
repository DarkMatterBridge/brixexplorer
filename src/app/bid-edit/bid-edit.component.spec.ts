import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidEditComponent } from './bid-edit.component';

describe('BidEditComponent', () => {
  let component: BidEditComponent;
  let fixture: ComponentFixture<BidEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
