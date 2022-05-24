import { TestBed } from '@angular/core/testing';

import { ContestantApiService } from './contestant-api.service';

describe('ContestantApiService', () => {
  let service: ContestantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
