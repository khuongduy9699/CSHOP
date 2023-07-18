import { Injectable } from '@angular/core';
import { CategoryAPIService } from 'src/api/category/category.api';
import { ProductAPIService } from 'src/api/product/product.api';
import { SnackbarService } from '../snackbar/snackbar.service';
import { Observable, map, mergeMap } from 'rxjs';
import { ProductModel } from 'src/app/pages/admin/product/product.model';
import { CategoryModel } from 'src/app/pages/admin/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private productApi: ProductAPIService, private categoryApi: CategoryAPIService) {}


  getAllProducts():Observable<ProductModel[]> {
    return this.productApi.getAllProducts().pipe(
      mergeMap((product)=>
        this.categoryApi.getAllCategories().pipe(
          map(category=>
            product.map(x=> {
              const item = category.filter(y=>x.categoryId==y._id);
              x.createdAt = new Date(x.createdAt||'').toLocaleString("en-GB", {dateStyle: 'short', timeStyle: 'short'});
              return {...x, categoryName: item[0].name};
            }
            )
          )
        )
      ),
    )
  }

  getProductById(_id: string):Observable<ProductModel> {
    return this.getAllProducts().pipe(
      map(item => item.filter(item=>item._id==_id)[0])
    );
  }

  getAllCategories():Observable<CategoryModel[]> {
    return this.categoryApi.getAllCategories().pipe(
      mergeMap(categories=>this.productApi.getAllProducts().pipe(
        map(product=>categories.map(x=>{
          const item = product.filter(y=>y.categoryId==x._id).map(z=>({...z, categoryName: x.name}));
          x.createdAt = new Date(x.createdAt||'').toLocaleString("en-GB", {dateStyle: 'short', timeStyle: 'short'});
          return {...x, products: item, productAmount: item.length}
        }))
      ))
    );
  }
}
