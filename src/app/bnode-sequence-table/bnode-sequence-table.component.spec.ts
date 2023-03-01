import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnodeSequenceTableComponent } from './bnode-sequence-table.component';

describe('BnodeSequenceTableComponent', () => {
  let component: BnodeSequenceTableComponent;
  let fixture: ComponentFixture<BnodeSequenceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BnodeSequenceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BnodeSequenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
