import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-orders',
  imports: [NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  @Input() orders: any;
  @Output() close = new EventEmitter<void>();

  closeSection() {
    this.close.emit();
  }
}
