import { TestBed } from '@angular/core/testing';

import { ArtItemService } from './art-item.service';

describe('ArtItemService', () => {
  let service: ArtItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});