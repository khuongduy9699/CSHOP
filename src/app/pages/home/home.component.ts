import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDTO } from 'src/api/category/category.dto';
import { ProductDTO } from 'src/api/product/product.dto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products!: MatTableDataSource<ProductDTO>;
  products1!: ProductDTO[];

  categories!:CategoryDTO[];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    public imageDialog: MatDialog,
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
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
      error: (error)=>console.log
    });
  }

  getProducts(): void {
    this.sharedService.getAllProducts().subscribe({
      next: (res) => {
        this.products = new MatTableDataSource(res);
        this.products1 = res;
        this.products.paginator = this.paginator;
        this.products.sort = this.sort;
      },
      error: (err) => console.log,
    });
  }

  getPhoto(name: string | null):string{
    const img = new Image();
    img.src = localStorage[`${name}`];
    return img.src;
  }

  onCategoryChange(_id:string):void{
    this.productService.getProductByCategory(_id).subscribe({
      next: (data)=> {
        this.products1=data;
      }
    })

  }

  onProductClick(_id:string):void{
    this.productService.getProductInfo(_id).subscribe({
      next: (data)=> {
        console.log('data',data);
      }
    })
  }

}
