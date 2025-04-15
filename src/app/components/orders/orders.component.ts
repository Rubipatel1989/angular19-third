import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from '../../../environments/environment';
import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, TitleCasePipe, FormsModule]
})
export class OrdersComponent implements OnInit {
  @Input() orders: any; // you can ignore this if unused
  @Input() customerId!: number;
  @Output() close = new EventEmitter<void>();

  orderList: any[] = [];
  isLoading = false;
  searchOrderText: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    if (!this.customerId) return;
    this.isLoading = true;

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${Environment.apiBaseUrl}/orders?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=${this.customerId}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (res) => {
        this.orderList = res.items || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
        this.isLoading = false;
      }
    });
  }

  get filteredOrders() {
    const query = this.searchOrderText.trim().toLowerCase();
    if (!query) return this.orderList;

    return this.orderList.filter(order =>
      order.increment_id?.toString().toLowerCase().includes(query)
    );
  }


  closeSection() {
    this.close.emit();
  }
}
