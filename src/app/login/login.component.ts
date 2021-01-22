import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  submitted: boolean;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginFormGroup.controls;
  }

  doLogin(): void {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.authService.validateUser(this.loginFormGroup.value).then((resp: User) => {
      if (resp) {
        this.errorMessage = null;
        // let user = new User();
        // user.loggedInDate = new Date().getTime() + 1200000;
        // console.log("Logged in user date:", new Date() + "And expiration date is: ", new Date(user.loggedInDate));
        // let obj: {  } = resp;
        this.userService.saveCurrentUser(resp);
        this.alertService.success("Login Successfull!");
        this.router.navigate(['contact-list']);
      } else {
        this.errorMessage = 'Invalid email or password';
        this.userService.clearCurrentUser();
        this.router.navigate(['login']);
      }
    }).catch(error => {
      console.log(error)
    });
  }
}
