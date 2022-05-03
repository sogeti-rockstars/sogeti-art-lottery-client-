import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryParticipantComponent } from './lottery-participant.component';

describe('LotteryParticipantComponent', () => {
  let component: LotteryParticipantComponent;
  let fixture: ComponentFixture<LotteryParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
