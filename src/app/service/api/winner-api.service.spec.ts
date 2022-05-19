import { TestBed } from '@angular/core/testing';

import { WinnerApiService } from './winner-api.service';

describe('WinnerApiService', () => {
  let service: WinnerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
