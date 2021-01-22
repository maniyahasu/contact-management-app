import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoaderComponent } from '../loader/loader.component';

const routes: Routes = [
  { path: '', component: ProductComponent,
    children: [
      { path: '', component: ProductListComponent },
      { 
        path: 'details/:id', component: ProductDetailsComponent,
        data: {
          mode: 'view'
        }
      },
      { 
        path: 'edit/:id', component: ProductDetailsComponent,
        data: {
          mode: 'edit'
        }
      }
    ]
 },
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductSidebarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  exports: [
    NgbModule,
    CommonModule
  ]
})
export class ProductModule { }
