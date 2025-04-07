import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-medical-info',
  imports: [NgIf],
  templateUrl: './medical-info.component.html',
  styleUrl: './medical-info.component.css'
})
export class MedicalInfoComponent {
  @Input() medicalInfo: any;
  @Output() close = new EventEmitter<void>();

  closeSection() {
    this.close.emit();
  }
}
