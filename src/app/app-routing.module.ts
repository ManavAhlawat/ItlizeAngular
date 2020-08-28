import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './home';
//import { ResourceComponent } from './pages/resource';
import { AuthGuard } from './_helpers';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './account/login.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const adminLayoutModule = () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule);

const routes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    //canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: adminLayoutModule}]
  },
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
     //{ path: 'resource', component: AdminLayoutComponent },
     { path: 'account', loadChildren: accountModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
