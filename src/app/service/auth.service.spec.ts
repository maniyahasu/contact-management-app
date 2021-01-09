import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AppRoutingModule } from '../app-routing.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
