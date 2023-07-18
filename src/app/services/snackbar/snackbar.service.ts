import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar){}
  public open(message: string, action = 'success', duration = 3000) {
    if(action == 'success') {
        this._snackBar.open(message, 'Cancel', { duration, panelClass: ['green-snackbar'], });
    } else {
      this._snackBar.open(message, 'Cancel', { duration, panelClass: ['red-snackbar'], });
    }
}
}
