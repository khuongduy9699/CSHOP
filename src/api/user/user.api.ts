import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/constants/constants';
import { UserDTO } from './user.dto';
import { getCookie } from 'src/shared/utils';

export interface LoginResponse {
  jwt: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(private _http: HttpClient) { }
  signUp(data: UserDTO):Observable<any> {
    return this._http.post(`${API_URL}/auth/register`, data);
  }

  logIn(data: UserDTO):Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${API_URL}/auth/login`, data);
  }

  getUserInfo():Observable<UserDTO> {
    return this._http.get<UserDTO>(`${API_URL}/user/info`);
  }

  logOut():Observable<any> {
    return this._http.post(`${API_URL}/auth/logout`, '');
  }

  getUsers():Observable<UserDTO[]> {
    return this._http.get<UserDTO[]>(`${API_URL}/users`);
  }
}
