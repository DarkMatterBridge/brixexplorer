import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleDummyTricksComponent } from './double-dummy-tricks.component';

describe('DoubleDummyTricksComponent', () => {
  let component: DoubleDummyTricksComponent;
  let fixture: ComponentFixture<DoubleDummyTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleDummyTricksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleDummyTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
