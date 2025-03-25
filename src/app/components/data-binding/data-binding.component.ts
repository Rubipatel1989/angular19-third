import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {
  firstName: string = "Pawan Kumar";
  rollNo: number = 213;
  isActive: boolean = true;
  currentDate: Date = new Date();
  myPlaceHolder:string = "Enter First Name";
  div1ClassName:string = "bg-success";
  selectedCity:string = "Delhi";
  constructor(){

  }
  showWelcomeMessage(){
    alert('I am best');
  }
  onCityChange(event:Event){
    const selectedCity = (event.target as HTMLSelectElement).value;
    console.log('City Changed:', selectedCity);
  }
}
