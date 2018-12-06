import { TestBed, inject } from '@angular/core/testing';

import { SensibleWordsService } from './sensible-words.service';

describe('SensibleWordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensibleWordsService]
    });
  });

  it('should be created', inject([SensibleWordsService], (service: SensibleWordsService) => {
    expect(service).toBeTruthy();
  }));
});
