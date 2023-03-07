import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {path: 'home',loadChildren: () =>import('./home/home.module').then((m) => m.HomeModule)},
      {path: 'categories',loadChildren: () =>import('./categories/categories.module').then((m) => m.CategoriesModule)},
      {path: 'categories/:id',loadChildren: () =>import('./products/products.module').then((m) => m.ProductsModule)},
      {path: 'products',loadChildren: () =>import('./products/products.module').then((m) => m.ProductsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
