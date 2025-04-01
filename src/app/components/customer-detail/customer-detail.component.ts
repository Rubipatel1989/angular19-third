import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailsComponent {
  @Input() customer: any;
  @Output() closePanel = new EventEmitter<void>();

  close() {
    this.closePanel.emit();
  }
}
