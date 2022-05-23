import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantSelButtonsComponent } from './contestant-sel-buttons.component';

describe('ContestantSelButtonsComponent', () => {
  let component: ContestantSelButtonsComponent;
  let fixture: ComponentFixture<ContestantSelButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestantSelButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantSelButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
