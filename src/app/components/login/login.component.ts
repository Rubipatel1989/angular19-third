import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: userLogin = new userLogin();
  router = inject(Router);
  onLogin(){
    if(this.loginObj.userName == 'admin' && this.loginObj.password == 'admin'){
      console.log('Login Success');
      this.router.navigate(['/customer-list']);
      localStorage.setItem('angularHiddenUser', this.loginObj.userName);
    } else{
      alert('Invalid login details');
    }
    console.log(this.loginObj);
  }
}
export class userLogin{
  userName: string;
  password: string;

  constructor(){
    this.userName = '',
    this.password = ''
  }
}