import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import CustomValidators from 'src/shared/validation';
import { UserDTO, mapToUserDTO } from 'src/api/user/user.dto';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSubmitted=false;
  hidePassword=true;
  hideConfirmPassword=true;
  signUpFormClone!: UserDTO;
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value

    return pass === confirmPass ? null : { notSame: true }
  }
  signUpForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
  }, {
    validators: [CustomValidators.match( 'password', 'confirmPassword')]
  }) ;



  constructor(private fb: FormBuilder, private authService: AuthService,
  private _snackBar: SnackbarService, private location: Location, private router: Router){}


  onSubmitForm():void{
    this.isSubmitted=true;
    if(this.signUpForm.valid){
      this.signUpFormClone=mapToUserDTO(this.signUpForm.getRawValue());
      this.authService.signUp(this.signUpFormClone).subscribe({
        next: (data) =>{
          this._snackBar.open('Signup User Succesfully!', 'success')
          this.router.navigate(['/auth'], {queryParams: {userName: data.userName}})
        },
        error: (error)=>{
          this._snackBar.open('Error: ' + error.error.message, 'error');
        }
      })
    }
    else {
      console.log('this.signUpForm', this.signUpForm);

    }
  }

  get userName() {
    return this.signUpForm.get("userName");
  }

  get name() {
    return this.signUpForm.get("name");
  }

  get password() {
    return this.signUpForm.get("password");
  }

  get confirmPassword() {
    return this.signUpForm.get("confirmPassword");
  }

  onBack():void{
    this.location.back();
  }

  canDeactivate(): Observable<boolean> {
    if (!this.isSubmitted) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }
    return of(true);
  }
}
