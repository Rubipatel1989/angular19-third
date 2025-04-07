import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault,AddressComponent],
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
