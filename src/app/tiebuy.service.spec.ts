import { TestBed, inject } from '@angular/core/testing';

import { TiebuyService } from './tiebuy.service';

describe('TiebuyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiebuyService]
    });
  });

  it('should be created', inject([TiebuyService], (service: TiebuyService) => {
    expect(service).toBeTruthy();
  }));
});
