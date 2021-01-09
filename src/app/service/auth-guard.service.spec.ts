import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AppRoutingModule } from '../app-routing.module';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
