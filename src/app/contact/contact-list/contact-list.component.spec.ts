import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Contact } from 'src/app/model/contact.model';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [ReactiveFormsModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create contact list section', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let contactContainer = fixture.debugElement.nativeElement.querySelector(".contact-list-container");
    expect(contactContainer).toBeDefined();
  });

  it('should render list of contacts in case of any', () => {
    let contact: Contact = {
      firstName: 'Hello',
      lastName: 'World',
      email: 'hw@gmail.com',
      phone: '1122553366'
    }
    component.ngOnInit();
    component.list.push(contact);
    fixture.detectChanges();
    let newContactRow = fixture.debugElement.nativeElement.querySelector("table tbody tr");
    expect(newContactRow).toBeDefined();
  });

  it('should open add new contact modal on Add Contact button click', () => {
    let addContactButton = fixture.debugElement.nativeElement.querySelector(".btn-primary");
    addContactButton.click();
    fixture.detectChanges();
    let addContactModal = document.querySelector('body .modal .modal-dialog .modal-header');
    setTimeout(() => {
      expect(addContactModal.textContent).toContain("Add Contact");
    }, 1000);
  });

  it('should open edit contact modal on click of pencil icon', () => {
    let contact: Contact = {
      firstName: 'Hello',
      lastName: 'World',
      email: 'hw@gmail.com',
      phone: '1122553366'
    }
    component.ngOnInit();
    component.list.push(contact);
    fixture.detectChanges();
    component.editContact(contact, 0);
    fixture.detectChanges();
    let editContactModal = document.querySelector('body .modal .modal-dialog .modal-header');
    setTimeout(() => {
      expect(editContactModal.textContent).toContain("Edit Contact");
    }, 1000);
  });
});
