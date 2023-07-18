import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss']
})
export class TableProductComponent {
  displayedColumns: string[] = ['id', 'name', 'image','price','description','categoryName', 'createdAt', 'actions'];
  @Input() products!: MatTableDataSource<ProductModel>;
  @Input() inputFilter!: any;

  @Output() onUpdateProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() onDeleteProduct: EventEmitter<number> = new EventEmitter<number>();
  @Output() onImageClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() navigateToDetail: EventEmitter<string> = new EventEmitter<string>();


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  handleUpdateProduct(product: ProductModel) {
    this.onUpdateProduct.emit(product);
  }

  handleDeleteProduct(_id: number) {
    this.onDeleteProduct.emit(_id);
  }

  handleImageClick(img: string) {
    this.onImageClick.emit(img);
  }

  handleNavigateToDetail(_id: string) {
    this.navigateToDetail.emit(_id);
  }

  getPhoto(name: string | null):string{
    const img = new Image();
    img.src = localStorage[`${name}`];
    return img.src;
  }


}
