import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/service/contact.service';
import { Contact } from '../../model/contact.model';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
})
export class AddEditContactComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, 
              private formBuilder: FormBuilder, 
              private contactService: ContactService) { }

  @Input('contact') contact:Contact;
  @Input('operation') operation: string

  addEditFormGroup: FormGroup;
  submitted: boolean;

  ngOnInit(): void {
    this.createAddEditForm();
  }

  saveContact() {
    this.submitted = true;
    if(this.addEditFormGroup.invalid) { return };

    if(this.operation === "Add") {
      this.contactService.addNewContact(this.addEditFormGroup.value);
      this.activeModal.close();
    } else {
      this.activeModal.close(this.addEditFormGroup.value);
    }
  }

  createAddEditForm() {
    let firstName = '';
    let lastName = '';
    let email = '';
    let phone = '';
    let isActive = true;

    if(this.operation === "Edit") {
      firstName = this.contact.firstName;
      lastName = this.contact.lastName;
      email = this.contact.email;
      phone = this.contact.phone;
      isActive = this.contact.isActive;
    }

    return this.addEditFormGroup = this.formBuilder.group({
      firstName: new FormControl(firstName, [Validators.required]),
      lastName: new FormControl(lastName, [Validators.required]),
      email: new FormControl(email, [Validators.required]),
      phone: new FormControl(phone, [Validators.required]),
      isActive: new FormControl(isActive),
    });
  }

  get f() { return this.addEditFormGroup.controls };

}
