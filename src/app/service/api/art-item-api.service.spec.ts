import { TestBed } from '@angular/core/testing';

import { ArtItemApiService } from './art-item-api.service';

describe('ArtItemApiService', () => {
  let service: ArtItemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
