import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { TableProductComponent } from './table-product/table-product.component';


@NgModule({
  declarations: [
    AddProductComponent,
    DeleteProductComponent,
    ListProductComponent,
    DetailProductComponent,
    TableProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
