import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IbentoDetailComponent } from './ibento-detail/ibento-detail.component';
import {IbentoDashboardComponent} from './ibento-dashboard/ibento-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: IbentoDetailComponent },
  { path: 'detail', component: IbentoDetailComponent },
  { path: 'dashboard', component: IbentoDashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
