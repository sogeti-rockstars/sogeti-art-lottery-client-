import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyImageCardComponent } from './fancy-image-card.component';

describe('FancyImageCardComponent', () => {
  let component: FancyImageCardComponent;
  let fixture: ComponentFixture<FancyImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancyImageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
