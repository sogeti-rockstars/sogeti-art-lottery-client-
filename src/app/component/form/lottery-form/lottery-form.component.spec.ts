import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryFormComponent } from './lottery-form.component';

describe('LotteryFormComponent', () => {
  let component: LotteryFormComponent;
  let fixture: ComponentFixture<LotteryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
