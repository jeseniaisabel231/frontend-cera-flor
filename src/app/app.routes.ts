import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { HomePage } from './pages/home.page';
import { DashboardPage } from './pages/admin/dashboard.page';
import { UsersPage } from './pages/admin/users.page';
import { ProductsPage } from './pages/admin/products.page';
import { ShoppingPage } from './pages/admin/shopping.page';
import { PromotionsPage } from './pages/admin/promotions.page';
import { RecuperarContrasenia } from './pages/recoverpassword.page';
import { AuthGuard, NoAuthGuard } from './guard/authentication.guard';
import { CatalogPage, } from './pages/catalog.page';
import { ProductDetailPage } from './pages/productDetail.page';
import { ShoppingCardPage } from './pages/shoppingCard.page';


export const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginPage, canActivate: [NoAuthGuard] },
  { path: 'registro', component: RegisterPage, canActivate: [NoAuthGuard] },
  { path: 'inicio', component: HomePage },
  { path: 'catalogo', component: CatalogPage },
  { path: 'catalogo/:categoria', component: CatalogPage },
  { path:'detalle-producto/:id', component: ProductDetailPage},
  { path: 'carrito', component: ShoppingCardPage },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasenia,
    canActivate: [NoAuthGuard],
  }, // Ruta única

  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UsersPage, canActivate: [AuthGuard] },
      { path: 'productos', component: ProductsPage, canActivate: [AuthGuard] },
      { path: 'ventas', component: ShoppingPage, canActivate: [AuthGuard] },
      {
        path: 'promociones',
        component: PromotionsPage,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'carrito', pathMatch: 'full' },
];
