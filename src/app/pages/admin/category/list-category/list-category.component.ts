import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { CategoryDTO } from 'src/api/category/category.dto';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';
import { timer } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent {
  categories!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'image', 'createdAt', 'actions'];
  isLoading:boolean=true;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    public addDialog: MatDialog,
    public updateDialog: MatDialog,
    public imageDialog: MatDialog,
    public deleteDialog: MatDialog,
    private _snackBar: SnackbarService,
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCategories();
  }

  applyFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }

  getCategories(): void {
    this.sharedService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = new MatTableDataSource(res);
        this.categories.paginator = this.paginator;
        this.categories.sort = this.sort;
      },
      error: (error)=>{
        this._snackBar.open('Error: ' + error, 'success');
      },
      complete: ()=>{
        timer(2000).subscribe({
          next: (res)=>this.isLoading=false});
      }
    });
  }

  getPhoto(name: string | null):string{
    const img = new Image();
    img.src = localStorage[`${name}`];
    return img.src;
    // this.image=img;
  }

  openDialog(): void {
    const openDialog = this.addDialog.open(AddCategoryComponent, {
      width: '500px',
      height: 'auto',
      data: { isUpdate: false },
    });
    openDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
        }
      },
    });
  }

  onDeleteCategory(_id: number):void{
    const deleteDialogRef = this.deleteDialog.open(DeleteCategoryComponent, {
      width: '330px',
      height: '200px',
      data: {
        id: _id,
      },
    });
    deleteDialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
        }
      },
    });
  }

  onUpdateCategory(row: CategoryDTO):void{
    const openDialog = this.addDialog.open(AddCategoryComponent, {
      width: '500px',
      height: 'auto',
      data: { data: row, isUpdate: true },
    });
    openDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
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
          this.getCategories();
        }
      },
    });
  }

  navigateToDetailCategory(_id: string):Promise<boolean>{
    return this.router.navigate(['admin/category/detail/' + _id]);
  }

  navigateBack():Promise<boolean>{
    return this.router.navigate(['..']);
  }

  onReload():void{
    this.isLoading=true;
    this.getCategories();
  }
}
