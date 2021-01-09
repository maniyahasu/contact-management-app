import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('contactMgmtAppNav') contactMgmtAppNav: ElementRef;

  currentUser: User;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.loggedInUser.subscribe(user => {
      this.currentUser = user;
    },(error) => { console.log("Error while getting logged in user", error)});
  }

  logOut() {
    this.authService.doLogOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleNavItem() {
    this.contactMgmtAppNav.nativeElement.classList.toggle('show');
  }

}
