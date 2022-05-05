import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtItemFormComponent } from './art-item-form.component';

xdescribe('ArtItemFormComponent', () => {
  let component: ArtItemFormComponent;
  let fixture: ComponentFixture<ArtItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtItemFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
