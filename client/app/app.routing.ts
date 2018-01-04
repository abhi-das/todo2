import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const LocalRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: 'dashboard',
    component: DashboardComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(LocalRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
