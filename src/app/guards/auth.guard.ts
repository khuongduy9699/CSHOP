import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { getCookie } from 'src/shared/utils';
import { Store } from '@ngrx/store';
import { selectUserAuth } from '../store/userAuth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLoggedIn: boolean=false;
      if(getCookie('auth')){
        isLoggedIn=true;
      }
      this.store.select(selectUserAuth).subscribe((data)=>{
        if(data.isLoggedIn) isLoggedIn=data.isLoggedIn
      });
      if (isLoggedIn) { return true; }
      // Redirect to the login page
      return this.router.parseUrl('/auth');
  }

}
