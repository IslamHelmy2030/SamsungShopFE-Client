import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routs:Routes =[
  { path: '', component: HomeComponent },
 
]


@NgModule({
  declarations: [
    HomeComponent,
    HotDealsComponent,
    WhyUsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routs),
    SharedModule,
  ]
})
export class HomeModule { }
