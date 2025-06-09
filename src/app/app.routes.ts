import { Routes } from '@angular/router';
import { AdminGuard, AuthGuard, NoAuthGuard } from './guard/authentication.guard';
import { AboutUsPage } from './pages/aboutUs.page';
import { DashboardPage } from './pages/admin/dashboard.page';
import { ProductsPage } from './pages/admin/products.page';
import { PromotionsPage } from './pages/admin/promotions.page';
import { ShoppingPage } from './pages/admin/shopping.page';
import { UsersPage } from './pages/admin/users.page';
import { CatalogPage } from './pages/catalog.page';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { PaymentPage } from './pages/payment,page';
import { PersonalizationPage } from './pages/personalization.page';
import { ProductDetailPage } from './pages/productDetail.page';
import { ProfilePage } from './pages/profile.page';
import { RecuperarContrasenia } from './pages/recoverpassword.page';
import { RegisterPage } from './pages/register.page';
import { ShoppingCardPage } from './pages/shoppingCard.page';
import { OrdersPage } from './pages/orders.page';

export const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginPage, canActivate: [NoAuthGuard] },
  { path: 'registro', component: RegisterPage, canActivate: [NoAuthGuard] },
  { path: 'inicio', component: HomePage },
  { path: 'catalogo', component: CatalogPage },
  { path: 'detalle-producto/:id', component: ProductDetailPage },
  { path: 'carrito', component: ShoppingCardPage },
  { path: 'personalizacion-producto', component: PersonalizationPage },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasenia,
    canActivate: [NoAuthGuard],
  }, // Ruta única
  {
    path: 'informacion-pago',
    component: PaymentPage,
    canActivate: [AuthGuard],
  },
  { path: 'sobre-nosotros', component: AboutUsPage },
  { path: 'perfil', component: ProfilePage, canActivate: [AuthGuard] },
  {
    path: 'pedidos', component: OrdersPage,  canActivate: [AuthGuard]
  },

  // Rutas de administrador
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard, AdminGuard] },
      { path: 'usuarios', component: UsersPage, canActivate: [AuthGuard, AdminGuard] },
      { path: 'productos', component: ProductsPage, canActivate: [AuthGuard, AdminGuard] },
      { path: 'ventas', component: ShoppingPage, canActivate: [AuthGuard, AdminGuard] },
      {
        path: 'promociones',
        component: PromotionsPage,
        canActivate: [AuthGuard, AdminGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'iniciar-sesion', pathMatch: 'full' },
];
