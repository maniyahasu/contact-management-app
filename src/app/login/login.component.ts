import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.loginFormGroup.controls;
  }

  doLogin() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.authService.validateUser(this.loginFormGroup.value).then((resp: User) => {
      if (resp) {
        this.errorMessage = null;
        this.userService.saveCurrentUser(resp);
        this.router.navigate(['contact-list']);
        // this.toastService.showSuccessMessage("Login Successfull");
      } else {
        this.errorMessage = 'Invalid email or password';
        this.userService.clearCurrentUser();
        this.router.navigate(['login']);
        // this.toastService.showErrorMessage("Login Failed");
      }
    }).catch(error => {
      console.log(error)
    });
  }
}
