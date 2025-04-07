import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [NgIf],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Input() address: any;
  @Output() close = new EventEmitter<void>();

  closeSection() {
    this.close.emit();
  }
}
