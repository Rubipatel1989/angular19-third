import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { checkLoginGuard } from './guard/check-login.guard';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [checkLoginGuard],
        children: [
            { path: 'customer-list', component: CustomerListComponent, canActivate: [checkLoginGuard] },

        ]
    }
];