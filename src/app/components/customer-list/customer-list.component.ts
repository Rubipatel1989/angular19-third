import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from '../customer-detail/customer-detail.component';

@Component({
  selector: 'app-user-reactive',
  imports: [ReactiveFormsModule, NgIf, CustomerDetailsComponent, FormsModule, NgFor],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  http = inject(HttpClient);
  isLoading: boolean = false;
  selectedCustomer: any = null;
  searchText = '';
  currentPage = 1;
  pageSize = 10; 

  userList: any[] = [];
  constructor() {
    this.getUsers();
  }
  getUsers() {
    this.isLoading = true; // https://projectapi.gerasim.in/api/Complaint/GetAllUsers
    this.http.get('https://projectapi.gerasim.in/api/Complaint/GetAllUsers').subscribe((response: any) => {
      console.log(response.data);
      if (response.result == true) {
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

  get filteredUsers() {
    let filtered = this.userList;

    if (this.searchText.trim()) {
      const lower = this.searchText.toLowerCase();
      filtered = filtered.filter((item: any) =>
        item.userName?.toLowerCase().includes(lower) ||
        String(item.id).includes(lower)
      );
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    const filtered = this.searchText.trim()
      ? this.userList.filter((item: any) =>
        item.userName?.toLowerCase().includes(this.searchText.toLowerCase())
      )
      : this.userList;
    return Math.ceil(filtered.length / this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }


}