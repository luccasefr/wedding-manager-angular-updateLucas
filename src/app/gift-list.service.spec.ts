import { TestBed, inject } from '@angular/core/testing';

import { GiftListService } from './gift-list.service';

describe('GiftListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftListService]
    });
  });

  it('should be created', inject([GiftListService], (service: GiftListService) => {
    expect(service).toBeTruthy();
  }));
});
