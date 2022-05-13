import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialArtItemFormComponent } from './material-art-item-form.component';

describe('MaterialArtItemFormComponent', () => {
  let component: MaterialArtItemFormComponent;
  let fixture: ComponentFixture<MaterialArtItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialArtItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialArtItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
