import { Component } from '@angular/core';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDTO } from 'src/api/product/product.dto';
import { AddProductComponent } from '../add-product/add-product.component';
import { CategoryDTO } from 'src/api/category/category.dto';
import { ProductModel } from '../product.model';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  productId!: string;
  product!: ProductModel;
  categories!: CategoryDTO[];

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    public addDialog: MatDialog,
    public deleteDialog: MatDialog,
    public imageDialog: MatDialog,
  ) {
    this.route.params.subscribe((params: any) => {
      this.productId = params['id'];
    });
    this.getProductInfo();
  }

  navigateBack():Promise<boolean>{
    return this.router.navigate(['admin/product']);
  }

  getProductInfo():void{
    this.sharedService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => console.log,
    });
  }

  onUpdateProduct(row: ProductDTO):void{
    const openDialog = this.addDialog.open(AddProductComponent, {
      width: '500px',
      height: 'auto',
      data: { data: row, isUpdate: true },
    });
    openDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductInfo();
        }
      },
    });
  }

  onDeleteProduct(id: string | null):void{
    const deleteDialogRef = this.deleteDialog.open(DeleteProductComponent, {
      width: '330px',
      height: '200px',
      data: {
        id: id,
      },
    });
    deleteDialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.navigateBack();
        }
      },
      error: console.log,
    });
  }

  getPhoto(name?: string | null):string{
    const img = new Image();
    img.src = localStorage[`${name}`];
    return img.src;
  }

  onImageClick(imageSrc: string):void{
    const openDialog = this.imageDialog.open(ImageDialogComponent, {
      width: '500px',
      height: '500px',
      data: { imageSrc: imageSrc },
    });
  }
}
