import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { eraseCookie } from 'src/shared/utils';
import { UserDTO } from 'src/api/user/user.dto';
import { Store } from '@ngrx/store';
import { userAuthActions } from '../../../store/userAuth.actions';
import { selectUserAuth } from '../../../store/userAuth.selectors';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$ = this.store.select(selectUserAuth).subscribe((data)=>this.user=data.userAuth);
  user!:UserDTO;
  constructor(private router: Router, private authService: AuthService, private store: Store) {}
  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data)=>{
        this.store.dispatch(userAuthActions.getUserAuth({userAuth: data}))
      },
      error:(error)=>console.log(error)
    })
  }

  navigateToAdminPage(): void{
    this.router.navigate(["admin"]);
  }

  navigateBackHome():void{
    this.router.navigate([''])
  }

  logOut():void{
    this.authService.logOut().subscribe(()=>{
      eraseCookie('auth');
      this.store.dispatch(userAuthActions.logOut({isLoggedIn: false}));
      this.router.navigate(['/auth']);
    })
  }
}
