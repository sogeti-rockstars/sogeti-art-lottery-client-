import { TestBed } from '@angular/core/testing';

import { AssociationInfoService } from './association-info.service';

describe('AssociationInfoService', () => {
  let service: AssociationInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
