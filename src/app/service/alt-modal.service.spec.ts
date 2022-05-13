import { TestBed } from '@angular/core/testing';

import { AltModalService } from './alt-modal.service';

describe('AltModalService', () => {
  let service: AltModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
