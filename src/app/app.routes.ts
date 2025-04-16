import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { HomePage } from './pages/home.page';
import { DashboardPage } from './pages/admin/dashboard.page';

export const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'inicio', component: HomePage },
  { path: 'admin',
    children:[
        { path: 'dashboard', component: DashboardPage}
    ]
  },
];
