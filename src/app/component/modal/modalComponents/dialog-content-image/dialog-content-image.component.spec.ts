import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentImageComponent } from './dialog-content-image.component';

describe('DialogContentImageComponent', () => {
  let component: DialogContentImageComponent;
  let fixture: ComponentFixture<DialogContentImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
