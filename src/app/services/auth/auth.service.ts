import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { LoginResponse, UserAPIService } from 'src/api/user/user.api';
import { UserDTO } from 'src/api/user/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  userInfo!:UserDTO

  constructor(private authApi: UserAPIService) { }
  signUp(data: UserDTO):Observable<UserDTO> {
    return this.authApi.signUp(data);
  }

  logIn(data: UserDTO):Observable<LoginResponse> {
    return this.authApi.logIn(data).pipe(
      delay(1000),
      tap(() => {
        if(data){
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      })
    );
  }

  getUserInfo():Observable<UserDTO> {

    return this.authApi.getUserInfo().pipe(
      map((user)=>this.userInfo=user)
    );
  }

  logOut():Observable<any> {
    return this.authApi.logOut().pipe(
      delay(1000),
      tap(() => {
        this.isLoggedIn = false;
      })
    );
  }

  getUsers():Observable<UserDTO[]> {
    return this.authApi.getUsers().pipe(
      map(item => item.map(x=>{
        x.createdAt = new Date(x.createdAt||'').toLocaleString("en-GB", {dateStyle: 'short', timeStyle: 'short'});

        return x;
    }))
    );
  }

}
