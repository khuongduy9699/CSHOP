import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category/category.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent {

  constructor(private categoryService: CategoryService, private dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: SnackbarService ){}

  onDeleteUser():void{
    this.categoryService.deleteCategory(this.data.id).subscribe({
      next: (res)=>{
        this.dialogRef.close(true);
        this._snackBar.open('Deleted Succesfully!', 'success')
      },
      error: (error)=>{
        this._snackBar.open('Error: ' + error, 'error');
      }
    });
  }
}
