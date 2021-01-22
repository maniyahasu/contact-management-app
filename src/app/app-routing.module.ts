import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuardService]
  },
  { 
    path: 'contact-list', 
    canActivate: [AuthGuardService],
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
