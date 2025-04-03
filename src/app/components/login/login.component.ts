import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: userLogin = new userLogin();
  http = inject(HttpClient);
  router = inject(Router);
  isLoading = false;

  onLogin() {
    this.isLoading = true;
    const url = `${Environment.apiBaseUrl}/integration/admin/token`;
    const body = {
      username: this.loginObj.userName,
      password: this.loginObj.password
    };

    this.http.post(url, body).subscribe({
      next: (response: any) => {
        // Magento returns plain string token
        if (typeof response === 'string') {
          localStorage.setItem('authToken', response);
          this.router.navigate(['/customer-list']);
        } else {
          alert('Unexpected token format');
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        const message = error?.error?.message || 'Login failed. Please try again.';
        alert(message);
      }
    });
  }
}

export class userLogin {
  userName: string = '';
  password: string = '';
}
