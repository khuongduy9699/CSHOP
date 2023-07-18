import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserAuth } from '../store/userAuth.selectors';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private _snackBar: SnackbarService, private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isActivated = false;
    this.store.select(selectUserAuth).subscribe({
      next: (data)=>{
      if(data.userAuth.role=='admin'){
        isActivated = true;
      }
      else isActivated = false
    },
      error: (error)=>this._snackBar.open(`Error: ${error}`, 'error')
    })
    if(isActivated){
      return isActivated;
    }
    else{
      this._snackBar.open('You have no permission!', 'error');
      return this.router.navigate(['']);
    }
  }


}
