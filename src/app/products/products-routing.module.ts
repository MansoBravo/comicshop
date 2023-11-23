import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ViewProductPageComponent } from './pages/view-product-page/view-product-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      // { path: 'new-hero', component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      //{ path: 'edit/:id', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },
      { path: 'comic/:id', component: ViewProductPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
