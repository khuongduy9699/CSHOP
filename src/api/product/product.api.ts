import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/constants/constants';
import { ProductDTO } from './product.dto';
@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {

  constructor(private _http: HttpClient) { }
  getAllProducts():Observable<ProductDTO[]> {
    return this._http.get<ProductDTO[]>(`${API_URL}/product/all`);
  }

  getProductInfo(_id: string):Observable<ProductDTO> {
    return this._http.post<ProductDTO>(`${API_URL}/product/productInfo`, {id: _id});
  }

  addProduct(data: ProductDTO):Observable<any> {
    return this._http.post(`${API_URL}/product/add`, data);
  }

  updateProduct(data: ProductDTO):Observable<any> {
    return this._http.put(`${API_URL}/product/update`, data);
  }

  deleteProduct(_id: string):Observable<any> {
    return this._http.delete(`${API_URL}/product/delete/${_id}`);
  }

  getProductsByCategory(_id: string):Observable<ProductDTO[]> {
    return this._http.post<ProductDTO[]>(`${API_URL}/product/byCategory`, {id: _id});
  }
}
