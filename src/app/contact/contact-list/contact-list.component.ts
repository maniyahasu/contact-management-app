import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit, OnDestroy {

  list: Contact[] = [];
  closeResult = '';
  subscription: Subscription;

  constructor(private contactService: ContactService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllContactList();
    this.contactService.saveContactsToLocalStorage();

    // Subscribing contact list subject to get latest updated list
    this.subscription = this.contactService.updatedContacts$.subscribe(dataList => {
      this.list = dataList;
    }, (error) => { console.log("Error while getting updated list of contact list", error)});
  }

  getAllContactList() {
    this.contactService.getContactList().subscribe(list => this.list = list);
  }

  addContact() {
    const modalRef = this.modalService.open(AddEditContactComponent);
    modalRef.componentInstance.operation = "Add";
  }

  editContact(contact: Contact, index: number) {
    const modalRef = this.modalService.open(AddEditContactComponent);
    modalRef.componentInstance.contact = {...contact};
    modalRef.componentInstance.operation = "Edit";

    modalRef.result.then((editedContact: Contact) => {
      if(editedContact) {
        this.contactService.updateContact(editedContact, index);
      }
    });
  }

  deleteContact(index: number) {
    this.contactService.deleteContact(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
