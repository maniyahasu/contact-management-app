import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

fdescribe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created component', () => {
    expect(service).toBeTruthy();
  });
});
