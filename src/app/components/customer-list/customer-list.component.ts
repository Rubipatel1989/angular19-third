import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { CustomerDetailsComponent } from '../customer-detail/customer-detail.component';
import { FormsModule } from '@angular/forms';
import { Environment } from '../../../environments/environment';
@Component({
  selector: 'app-user-reactive',
  standalone: true,
  imports: [NgIf, CustomerDetailsComponent, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  http = inject(HttpClient);
  isLoading = false;
  selectedCustomer: any = null;
  searchText = '';
  currentPage = 1;
  pageSize = 10;
  userList: any[] = [];

  constructor() {
    this.getCustomers();
  }

  getCustomers() {
    this.isLoading = true;
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`${Environment.apiBaseUrl}/customers/search?searchCriteria[currentPage]=${this.currentPage}&searchCriteria[pageSize]=${this.pageSize}`, { headers }).subscribe({
      next: (response) => {
        this.userList = response.items;
        this.isLoading = false;
      },
      error: (err) => {
        alert('Failed to fetch customers');
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get filteredUsers() {
    let filtered = this.userList;
    if (this.searchText.trim()) {
      const lower = this.searchText.toLowerCase();
      filtered = filtered.filter((item: any) =>
        item.firstname?.toLowerCase().includes(lower) ||
        item.lastname?.toLowerCase().includes(lower) ||
        item.email?.toLowerCase().includes(lower)
      );
    }
    return filtered;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getCustomers();
  }

  get totalPages() {
    return Math.ceil(1797 / this.pageSize); // Hardcoded total_count for now
  }

  getState(address: any[]) {
    return address?.[0]?.region?.region || '';
  }
}
