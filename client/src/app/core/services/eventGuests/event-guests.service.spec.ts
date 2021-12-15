import { TestBed } from '@angular/core/testing';

import { EventGuestsService } from './event-guests.service';

describe('EventGuestsService', () => {
  let service: EventGuestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventGuestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
