import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductComponent } from '../add-product/add-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ProductDTO } from 'src/api/product/product.dto';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';
import { MatChipSelectionChange } from '@angular/material/chips';
import { timer } from 'rxjs';
import { CategoryModel } from '../../category/category.model';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { ProductModel } from '../product.model';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TableProductComponent } from '../table-product/table-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  products!: MatTableDataSource<ProductDTO>;
  categories!:CategoryModel[];
  isLoading:boolean=true;
  productByCategories:{[id:string]:ProductDTO[]}[]=[];
  constructor(
    private sharedService: SharedService,
    private router: Router,
    public addDialog: MatDialog,
    public updateDialog: MatDialog,
    public imageDialog: MatDialog,
    public deleteDialog: MatDialog,
    private _snackBar: SnackbarService,
  ) {}
  
  @ViewChild(TableProductComponent) productTable!: TableProductComponent;


  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  applyFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  getCategories(): void {
    this.sharedService.getAllCategories().subscribe({
      next: (data)=> {
        this.categories=data;
      },
      error: (error)=>{
        this._snackBar.open('Error: ' + error, 'error');
      },
    });
  }

  getProductsByCategory(data:ProductModel[]):{[id:string]:ProductDTO[]} {
    return data.reduce(function (r, a) {
      if(a.categoryId){
        r[a.categoryId] = r[a.categoryId] || [];
        r[a.categoryId].push(a);
        return r;
      }
  }, Object.create(null))
  }

  getProducts(): void {
    this.sharedService.getAllProducts().subscribe({
      next: (res) => {
        this.products = new MatTableDataSource<ProductModel>(res);
        this.products.paginator = this.productTable.paginator;
        this.products.sort = this.productTable.sort;
      },
      error: (error)=>{
        this._snackBar.open('Error: ' + error, 'error');
      },
      complete: ()=>{
        timer(2000).subscribe({
          next: ()=>this.isLoading=false});
      }
    });
  }


  openDialog(): void {
    const openDialog = this.addDialog.open(AddProductComponent, {
      width: '500px',
      height: 'auto',
      data: { isUpdate: false },
    });
    openDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.onReload();
        }
      },
    });
  }

  onDeleteProduct(_id: number) :void {
    const deleteDialogRef = this.deleteDialog.open(DeleteProductComponent, {
      width: '330px',
      height: '200px',
      data: {
        id: _id,
      },
    });
    deleteDialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.onReload();
        }
      },
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
          this.onReload();
        }
      },
    });
  }

  onImageClick(imageSrc: string):void{
    const openDialog = this.imageDialog.open(ImageDialogComponent, {
      width: '500px',
      height: '500px',
      data: { imageSrc: imageSrc },
    });
    openDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      },
    });
  }

  navigateToDetailProduct(_id: string):Promise<boolean>{
    return this.router.navigate(['admin/product/detail/' + _id]);
  }

  navigateBack():Promise<boolean>{
    return this.router.navigate(['..']);
  }

  getCategoryName(_id: string):string|null|undefined{
    return this.categories.find(category=>category._id==_id)?.name;
  }

  onCategoryChange(event: MatChipSelectionChange):void{
    if(event.selected){
      this.showProductByCategory(event.source.value)
    }
    else {
      this.getProducts();
    }
  }

  showProductByCategory(categoryId: string):void{
    const category = this.categories.filter(x=>x._id==categoryId);
    this.products=new MatTableDataSource(category[0].products);
    this.products.paginator = this.productTable.paginator;
    this.products.sort = this.productTable.sort;
  }

  onReload():void{
    this.isLoading=true;
    this.getCategories();
    this.getProducts();
  }

  navigateToDetail(_id: string|null):Promise<boolean>{
    return this.router.navigate([`admin/product/${_id}`]);
  }
}
