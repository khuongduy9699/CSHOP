import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', component: UserComponent},
    {
      path: 'category',
      loadChildren: () => import('./category/category.module').then((m) => m.CategoryModule),
    },
    {
      path: 'product',
      loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
