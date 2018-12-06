import { TestBed, inject } from '@angular/core/testing';

import { TiepieceService } from './tiepiece.service';

describe('TiepieceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiepieceService]
    });
  });

  it('should be created', inject([TiepieceService], (service: TiepieceService) => {
    expect(service).toBeTruthy();
  }));
});
