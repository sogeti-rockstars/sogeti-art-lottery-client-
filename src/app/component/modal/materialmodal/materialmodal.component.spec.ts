import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialmodalComponent } from './materialmodal.component';

describe('MaterialmodalComponent', () => {
  let component: MaterialmodalComponent;
  let fixture: ComponentFixture<MaterialmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
