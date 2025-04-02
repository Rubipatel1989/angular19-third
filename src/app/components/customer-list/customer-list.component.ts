import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormGroupName, Validators, FormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from '../customer-detail/customer-detail.component';

@Component({
  selector: 'app-user-reactive',
  imports: [ReactiveFormsModule, NgIf, CustomerDetailsComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  http = inject(HttpClient);
  isLoading: boolean = false;
  selectedCustomer: any = null;
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(0),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required]),
    role: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    createdDate: new FormControl(new Date()),
    projectName: new FormControl(''),
    refreshToken: new FormControl(''),
    refreshTokenExpiryTime: new FormControl(new Date()),

  });

  userList: any[] = [];
  constructor() {
    this.getUsers();
  }
  getUsers() {
    this.isLoading = true;
    this.http.get('https://projectapi.gerasim.in/api/Complaint/GetAllUsers').subscribe((response: any) => {
      console.log(response);
      if (response.result) {
        this.userList = response.data;
        this.isLoading = false;
      } else {
        alert(response.message);
      }
    })
  }

  showCustomerDetails(customer: any) {
    this.selectedCustomer = customer;
  }

  closeDetails() {
    this.selectedCustomer = null;
  }

}