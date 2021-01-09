import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  submitted: boolean;
  userList: User[] = [];
  message: string;
  isRegisterSuccess: boolean;
  subscription: Subscription;
  
  constructor(private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService,
    private encryptService: EncryptDecryptService) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    // getting contact list from local storage
    this.subscription = this.userService.getUserList().subscribe((list: User[]) => {
      this.userList = list;
    },(error) => { console.log("Error while getting contact list from local storage", error)});

    if (!this.userList || this.userList.length === 0) {
      this.userService.saveUserList(this.userList);
    }
  }

  registerContact() {
    this.submitted = true;
    if (this.registerFormGroup.invalid) {
      return;
    }
    // Checking email is already exist or not
    let newUser: User = { ...this.registerFormGroup.value };
    if (this.userList != null) {
      let isExist = this.userList.filter(el => el.email === newUser.email);
      if (isExist.length > 0) {
        this.message = 'Email is already exist, use different';
        this.isRegisterSuccess = false;
        return;
      }
    }

    this.isRegisterSuccess = true;
    
    // Encrypting the password
    newUser.password = this.encryptService.encrypt(newUser.password);    

    this.userList.push(newUser);
    this.userService.saveUserList(this.userList);
    this.message = 'You have registered successfully';

    // Navigating to login after 1 second
    setTimeout(() => {
      this.message = null;
      this.registerFormGroup.reset();
      this.router.navigate(['/login']);
    }, 1000);
  }

  get f() {
    return this.registerFormGroup.controls;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  backToLogin() {
    this.router.navigate(['/login']);
  }
}
