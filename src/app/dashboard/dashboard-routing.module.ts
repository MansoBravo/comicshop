import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ListPageComponent } from '../products/pages/list-page/list-page.component';
import { isAuthenticatedGuard } from '../auth/guards';
import { NewPageComponent } from '../products/pages/new-page/new-page.component';
import { SearchPageComponent } from '../products/pages/search-page/search-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { RegisterPageComponent } from '../auth/pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'list', canActivate: [ isAuthenticatedGuard ], component: ListPageComponent },
      { path: 'edit/:id', canActivate: [ isAuthenticatedGuard ], component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'users', canActivate: [ isAuthenticatedGuard ], component: UsersPageComponent },
      { path: 'register', canActivate: [ isAuthenticatedGuard ], component: RegisterPageComponent },
      { path: ':id', canActivate: [ isAuthenticatedGuard ], component: NewPageComponent },
      { path: '**', redirectTo: 'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
