import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ReactiveFormsModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create header section', () => {
    let headerSection = fixture.debugElement.nativeElement.querySelector("nav");
    expect(headerSection).toBeDefined();
  });

  it('should show Login and Register link if user is not logged in', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let loginLink = fixture.debugElement.nativeElement.querySelector("#loginLink");
    let registerLink = fixture.debugElement.nativeElement.querySelector("#registerLink");
    expect(loginLink.textContent).toContain("Login");
    expect(registerLink.textContent).toContain("Register");
  });

  it('should show Logout link if user is logged in', () => {
    component.currentUser = {
      firstName: 'test',
      lastName: 'user',
      email: 'test@gmail.com',
      password: '123456'
    };
    fixture.detectChanges();
    let logOut = fixture.debugElement.nativeElement.querySelector("#logoutLink");
    expect(logOut.textContent).toContain("Logout");
  });
});
