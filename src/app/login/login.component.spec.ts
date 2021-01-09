import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let form = fixture.debugElement.nativeElement.querySelector(".login-form-wrapper");
    expect(form).toHaveClass('login-form-wrapper');
  });

  it(`should throw error 'Email is required' if user tries to login without email`, () => {
    component.ngOnInit();
    component.loginFormGroup.patchValue({
      email: '',
      password: '123546'
    });
    fixture.detectChanges();
    component.doLogin();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Email is required');
  });

  it(`should throw error 'Password is required' if user tries to login without password`, () => {
    component.ngOnInit();
    component.loginFormGroup.patchValue({
      email: 'test@gmail.com',
      password: ''
    });
    fixture.detectChanges();
    component.doLogin();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Password is required');
  });

  it('should throw error if user submit form without entering emain and password', () => {
    component.ngOnInit();
    component.loginFormGroup.patchValue({
      email: '',
      password: ''
    });
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('.btn-primary');
    button.click();
    fixture.detectChanges();
    let errorClass = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorClass).toBeDefined();
  });

  it('should navigate to contact-list in case of successful login', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.loginFormGroup.patchValue({
      email: 'test@gmail.com',
      password: '123456'
    });
    let loginSpy = spyOn(component, 'doLogin').and.callThrough();
    component.doLogin();
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalled();
  });
});
