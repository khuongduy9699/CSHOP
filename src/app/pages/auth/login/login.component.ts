import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { userAuthActions } from 'src/app/store/userAuth.actions';
import { selectUserAuth } from 'src/app/store/userAuth.selectors';
import { setCookie } from 'src/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitted=false;
  signInForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  }) ;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: SnackbarService,
    private route: ActivatedRoute, private router: Router, private store: Store){
    this.signInForm.controls.userName.setValue(this.route.snapshot.queryParamMap.get('userName'));
    }

  onSubmitForm():void{
    this.isSubmitted=true;
    if(this.signInForm.valid){
      this.authService.logIn(this.signInForm.getRawValue()).subscribe({
        next: (data) =>{
          this._snackBar.open(`Sign In Succesfully!`, 'success')
          this.store.dispatch(userAuthActions.logIn({isLoggedIn: true}));
          setCookie('auth', data.jwt,data.exp);
          this.authService.getUserInfo().subscribe({
            next: (data)=>{
              this.store.dispatch(userAuthActions.getUserAuth({userAuth: data}))
              this.store.select(selectUserAuth).subscribe({
                next: (data)=>{
                if(data.userAuth.role=='admin'){
                  this.router.navigate(['admin']);
                }
                else{
                  this.router.navigate(['']);
                }
              },
                error: (error)=>this._snackBar.open(`Error: ${error}`, 'error')
              })
            },
            error:(error)=>this._snackBar.open(`Error: ${error}`, 'error')
          });
        },
        error: (error)=>{
          this._snackBar.open('Error: ' + error, 'error');
        }
      })
    }
  }
}
