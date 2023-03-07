import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routs: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'Details/:Id',
    component: ProductDetailsComponent
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routs),
    SharedModule,

  ],
})
export class ProductsModule {}
