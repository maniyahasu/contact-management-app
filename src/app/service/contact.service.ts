import { Injectable } from '@angular/core';
import { Observable, of, Subject, Subscription} from 'rxjs';
import { Contact } from '../model/contact.model';
import { map, take, tap } from 'rxjs/operators';

const contactData: Contact[] = [
  { firstName: 'Jon', lastName: 'Doe', email: 'johnd@gmail.com', phone: '2233665544', isActive: true },
  { firstName: 'Marry', lastName: 'Kom', email: 'merryk@gmail.com', phone: '3322114455', isActive: true },
  { firstName: 'Mackwan', lastName: 'Joseph', email: 'mekj@gmail.com', phone: '3366558899', isActive: false }
];

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  contacts: Contact[] = [];
  updatedContacts$ = new Subject<Contact[]>();

  getContactList(): Observable<Contact[]> {
    return of(JSON.parse(localStorage.getItem('CONTACT_USERS')) as Array<Contact> || []).pipe(
      map(data => {
        this.contacts = data;
        return data;
      })
    );
  }

  addNewContact(newContact: Contact) {
    this.contacts.push(newContact);
    this.saveContactsToLocalStorage();
    this.updateContactSubject();
  }

  updateContact(updatedContact: Contact, index: number) {
    // let index = this.contacts.findIndex(el => el.email === updatedContact.email);
    this.contacts[index] = updatedContact;
    this.saveContactsToLocalStorage();
    this.updateContactSubject();
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveContactsToLocalStorage();
    this.updateContactSubject();
  }

  saveContactsToLocalStorage() {
    localStorage.setItem('CONTACT_USERS', JSON.stringify(this.contacts));
  }

  updateContactSubject() {
    this.updatedContacts$.next(this.contacts.slice());
  }
}
