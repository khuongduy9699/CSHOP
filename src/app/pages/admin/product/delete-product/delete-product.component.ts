import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
  constructor(private productService: ProductService, private dialogRef: MatDialogRef<DeleteProductComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: SnackbarService ){}

  onDeleteUser():void{
    this.productService.deleteProduct(this.data.id).subscribe({
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
