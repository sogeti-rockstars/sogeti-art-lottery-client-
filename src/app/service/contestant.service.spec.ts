import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ContestantService } from './contestant.service';

describe('ContestantService', () => {
  let service: ContestantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ContestantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
