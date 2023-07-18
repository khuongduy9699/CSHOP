import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/constants/constants';
import { CategoryDTO } from './category.dto';
import { CategoryModel } from 'src/app/pages/admin/category/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryAPIService {

  constructor(private _http: HttpClient) { }
  getAllCategories():Observable<CategoryDTO[]> {
    return this._http.get<CategoryDTO[]>(`${API_URL}/category/all`);
  }

  addCategory(data: CategoryDTO):Observable<any> {
    return this._http.post(`${API_URL}/category/add`, data);
  }

  updateCategory(data: CategoryDTO):Observable<any> {
    return this._http.put(`${API_URL}/category/update`, data);
  }

  deleteCategory(_id: string):Observable<any> {
    return this._http.delete(`${API_URL}/category/delete/${_id}`);
  }
}
