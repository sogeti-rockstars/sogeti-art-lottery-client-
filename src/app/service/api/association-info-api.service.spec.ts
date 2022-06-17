import { TestBed } from '@angular/core/testing';

import { AssociationInfoApiService } from './association-info-api.service';

describe('AssociationInfoApiService', () => {
  let service: AssociationInfoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationInfoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
