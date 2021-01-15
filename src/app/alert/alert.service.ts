import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private successSubject = new Subject<{message: string, autoCollapse: boolean}>();
  successMessage = this.successSubject.asObservable();

  private warningSubject = new Subject<{message: string, autoCollapse: boolean}>();
  warningMessage = this.warningSubject.asObservable();

  private errorSubject = new Subject<{message: string, autoCollapse: boolean}>();
  errorMessage = this.errorSubject.asObservable();

  constructor() { }

  success(message: string, autoCollapse: boolean = true) {
    this.successSubject.next({message: message, autoCollapse: autoCollapse});
  }

  error(message: string, autoCollapse: boolean = true) {
    this.errorSubject.next({message: message, autoCollapse: autoCollapse});
  }

  warning(message: string, autoCollapse: boolean = true) {
    this.warningSubject.next({message: message, autoCollapse: autoCollapse});
  }

}
