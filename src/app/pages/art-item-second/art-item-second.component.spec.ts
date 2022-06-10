import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtItemSecondComponent } from './art-item-second.component';

describe('ArtItemSecondComponent', () => {
  let component: ArtItemSecondComponent;
  let fixture: ComponentFixture<ArtItemSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtItemSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtItemSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
