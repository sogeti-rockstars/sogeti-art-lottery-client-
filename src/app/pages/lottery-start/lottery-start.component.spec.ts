import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryStartComponent } from './lottery-start.component';

describe('LotteryStartComponent', () => {
  let component: LotteryStartComponent;
  let fixture: ComponentFixture<LotteryStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
