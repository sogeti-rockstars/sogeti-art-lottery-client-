import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtItemsComponent } from './art-items.component';

describe('ArtItemsComponent', () => {
  let component: ArtItemsComponent;
  let fixture: ComponentFixture<ArtItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
