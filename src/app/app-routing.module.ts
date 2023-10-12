import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { RemoveProductComponent } from './remove-product/remove-product.component';
import { ListProductComponent } from './list-product/list-product.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'remove-product/:id', component: RemoveProductComponent },
  { path: 'list-products', component: ListProductComponent },
  { path: '', redirectTo: '/list-products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
