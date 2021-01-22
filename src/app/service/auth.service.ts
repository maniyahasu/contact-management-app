import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnDestroy {

  loggedInUser = new BehaviorSubject<User>(null);
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router, private encryptService: EncryptDecryptService) { }

// Checking if user is valid or not
  validateUser(userData: User): Promise<User | boolean> {
    return new Promise((resolve, reject) => {
      this.subscription = this.userService.getUserList().subscribe(users => {
        if(users.length > 0) {
          users.filter(user => {
            user.password = this.encryptService.decrypt(user.password);
            if(user.email === userData.email && user.password === userData.password) {
              this.loggedInUser.next(user);
              resolve(user);
            }
            else {
              resolve(false);
            }
          });
        }
        else { resolve(false); }
      });
    });
  }

  // Logout
  doLogOut() {
    this.loggedInUser.next(null);
    this.userService.clearCurrentUser();
    this.router.navigate(['login']);
  }

  // Auto login if user is logged in and refresh the page
  doAutoLogin() {
    let loggedInUser: User;
    this.userService.getCurrentUser().subscribe((user: User) => loggedInUser = user);
    if(!loggedInUser) { return };

    this.loggedInUser.next(loggedInUser);
    this.router.navigate(['/contact-list']);
    // this.router.navigate(['/product']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
