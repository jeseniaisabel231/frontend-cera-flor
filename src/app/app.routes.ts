import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { HomePage } from './pages/home.page';
import { DashboardPage } from './pages/admin/dashboard.page';
import { UsersPage } from './pages/admin/users.page';
import { ProductsPage } from './pages/admin/products.page';
import { ShoppingPage } from './pages/admin/shopping.page';
import { PromotionsPage } from './pages/admin/promotions.page';
import { RecoverPasswordPage } from './pages/recoverpassword.page';

export const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'inicio', component: HomePage },
  { path: 'recuperar-contrasena', component: RecoverPasswordPage }, // Ruta única

  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'usuarios', component: UsersPage },
      { path: 'productos', component: ProductsPage },
      { path: 'ventas', component: ShoppingPage },
      { path: 'promociones', component: PromotionsPage },
      
    ],
  },{path: '**', redirectTo: 'registro', pathMatch: 'full'},

];
