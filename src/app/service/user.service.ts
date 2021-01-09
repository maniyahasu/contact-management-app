import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private encryptService: EncryptDecryptService) { }

  getUserList(): Observable<User[]> {
    return of(JSON.parse(localStorage.getItem('USERS')) as Array<User> || []);
  }

  saveUserList(userList: User[]) {
    localStorage.setItem('USERS', JSON.stringify(userList));
  }

  saveCurrentUser(user: User) {
    user.password = this.encryptService.encrypt(user.password);
    localStorage.setItem('LOG-IN-USER', JSON.stringify(user));
  }

  getCurrentUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('LOG-IN-USER')));
  }

  clearCurrentUser() {
    localStorage.removeItem('LOG-IN-USER');
  }
}
