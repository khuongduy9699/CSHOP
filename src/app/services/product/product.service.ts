import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductAPIService } from 'src/api/product/product.api';
import { ProductDTO } from 'src/api/product/product.dto';
import { ProductModel } from 'src/app/pages/admin/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private productApi: ProductAPIService) {}

  getProductInfo(_id: string):Observable<ProductModel> {
    return this.productApi.getProductInfo(_id);
  }

  addProduct(data: ProductDTO):Observable<ProductDTO> {
    return this.productApi.addProduct(data);
  }

  updateProduct(data: ProductDTO):Observable<ProductDTO> {
    return this.productApi.updateProduct(data);
  }

  deleteProduct(_id: string):Observable<ProductDTO> {
    return this.productApi.deleteProduct(_id);
  }

  getProductByCategory(_id: string):Observable<ProductModel[]> {
    return this.productApi.getProductsByCategory(_id).pipe(
      map(item => item.map(x=>{
        x.createdAt = new Date(x.createdAt||'').toLocaleString("en-GB", {dateStyle: 'short', timeStyle: 'short'});
        return x;
      }))
    );
  }
}
