import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryAPIService } from 'src/api/category/category.api';
import { CategoryDTO } from 'src/api/category/category.dto';
import { CategoryModel } from 'src/app/pages/admin/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories!: CategoryModel[];

  constructor(private categoryApi: CategoryAPIService) { }

  addCategory(data: CategoryDTO):Observable<CategoryDTO> {
    return this.categoryApi.addCategory(data);
  }

  updateCategory(data: CategoryDTO):Observable<CategoryDTO> {
    return this.categoryApi.updateCategory(data);
  }

  deleteCategory(_id: string):Observable<CategoryDTO> {
    return this.categoryApi.deleteCategory(_id);
  }
}
