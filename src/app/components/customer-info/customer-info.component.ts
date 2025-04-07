import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-info',
  imports: [NgIf],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent {
  @Input() customerInfo: any;
  @Output() close = new EventEmitter<void>();

  closeSection() {
    this.close.emit();
  }
}
