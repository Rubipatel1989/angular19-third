import { Component } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [UserComponent, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-third';
}
