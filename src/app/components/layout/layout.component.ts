import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router = inject(Router);
  loggedUsername: string = '';
  constructor(){
    const loggedUsername = localStorage.getItem('angularHiddenUser');
    if(loggedUsername){
      this.loggedUsername = loggedUsername;
    } else{
      //this.router.navigate(['/login']);
    }
  }

  onLogout(){
    localStorage.removeItem('angularHiddenUser');
    this.router.navigate(['/login']);
  } 
}