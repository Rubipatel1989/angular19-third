import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ng-if',
  imports: [CommonModule, FormsModule],
  templateUrl: './ng-if.component.html',
  styleUrl: './ng-if.component.css'
})
export class NgIfComponent {
  div1Visiable: boolean = false;
  number1: number = 0;
  number2: number = 0;

  hideDiv1() {
    this.div1Visiable = false
  }
  showDiv1() {
    this.div1Visiable = true
  }
}
