import { TestBed } from '@angular/core/testing';

import { LotteryApiService } from './lottery-api.service';

describe('LotteryApiService', () => {
  let service: LotteryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotteryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
