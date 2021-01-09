import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create register form', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let form = fixture.debugElement.nativeElement.querySelector(".register-form-wrapper");
    expect(form).toBeDefined();
  });

  it(`should throw error 'First name is required' if user tries to register without first name`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: '',
      lastName: 'test',
      email: 'test@gmail.com',
      password: '123456'
    });
    fixture.detectChanges();
    component.registerContact();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('First name is required');
  });

  it(`should throw error 'Last name is required' if user tries to register without last name`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: 'test',
      lastName: '',
      email: 'test@gmail.com',
      password: '123456'
    });
    fixture.detectChanges();
    component.registerContact();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Last name is required');
  });

  it(`should throw error 'Email is required' if user tries to register without email`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: 'test',
      lastName: 'test',
      email: '',
      password: '123456'
    });
    fixture.detectChanges();
    component.registerContact();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Email is required');
  });

  it(`should throw error 'Email must be a valid' if user tries to register with invalid email`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: 'test',
      lastName: 'test',
      email: 'test',
      password: '123456'
    });
    fixture.detectChanges();
    component.registerContact();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Email must be a valid');
  });

  it(`should throw error 'Password is required' if user tries to register without password`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: ''
    });
    fixture.detectChanges();
    component.registerContact();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Password is required');
  });

  it(`should throw error 'Password must be at least 6 characters long' if user tries to register with invalid password`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: '123'
    });
    fixture.detectChanges();
    component.registerContact();
    fixture.detectChanges();
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(errorMessage.textContent).toContain('Password must be at least 6 characters long');
  });

  it(`should redirect to login screen in case of registration successfull`, () => {
    component.ngOnInit();
    component.registerFormGroup.patchValue({
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: '123456'
    });
    let registerSpy = spyOn(component, 'registerContact').and.callThrough();
    component.registerContact();
    fixture.detectChanges();
    expect(registerSpy).toHaveBeenCalled();
  });
});
