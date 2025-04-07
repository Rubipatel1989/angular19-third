import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-prescriptions',
  imports: [NgIf],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent {
  @Input() prescriptionsInfo: any;
  @Output() close = new EventEmitter<void>();

  closeSection() {
    this.close.emit();
  }
}
