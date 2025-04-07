import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { AddressComponent } from '../address/address.component';
import { CustomerInfoComponent } from "../customer-info/customer-info.component";
import { OrdersComponent } from "../orders/orders.component";
import { MedicalInfoComponent } from "../medical-info/medical-info.component";
import { PrescriptionsComponent } from "../prescriptions/prescriptions.component";

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [NgSwitch, NgClass, NgSwitchCase, AddressComponent, CustomerInfoComponent, OrdersComponent, MedicalInfoComponent, PrescriptionsComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailsComponent {
  @Input() customer: any;
  @Output() closePanel = new EventEmitter<void>();

  activeMenu: string | null = null;

  close() {
    this.closePanel.emit();
  }
}
