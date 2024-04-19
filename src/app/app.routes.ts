import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'success', component: SuccessComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];
