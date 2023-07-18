import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryDTO } from 'src/api/category/category.dto';
import { ProductDTO } from 'src/api/product/product.dto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  addForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    image: ['', [Validators.required]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  }, {updateOn: 'blur'});
  isSubmitted = false;
  isUpdate = false;
  image = new Image();
  categories!:CategoryDTO[];

  get name() {
    return this.addForm.get("name");
  }

  get img() {
    return this.addForm.get("image");
  }

  get price() {
    return this.addForm.get("price");
  }

  get description() {
    return this.addForm.get("description");
  }

  get categoryId() {
    return this.addForm.get("categoryId");
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private _dialogRef: MatDialogRef<AddProductComponent>,
    private _snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA)
    public data: { data?: ProductDTO; isUpdate: boolean }
  ) {}

  ngOnInit(): void {
    if (this.data.data) {
      this.addForm.setValue({
        _id: this.data.data._id,
        name: this.data.data.name,
        image: this.data.data.image,
        price: this.data.data.price,
        description: this.data.data.description,
        categoryId: this.data.data.categoryId,
      });
      this.getPhoto(this.data.data.image);
    }
    this.isUpdate = this.data.isUpdate;
    this.sharedService.getAllCategories().subscribe({
      next: (data)=> {
        this.categories=data;
      },
      error: (error)=>console.log
    });
  }

  ngDoCheck(): void {
    if(this.addForm.getRawValue().image){
      this.getPhoto(this.addForm.getRawValue().image);
    }
  }

  onLoadImage(event: any):void{
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); //attempts to read the file in question.
    reader.onload = function (e) {
      // Create a new image.
      localStorage[`${event.target.files[0].name}`] =  reader.result; //stores the image to localStorage
    };
    this.addForm.controls.image.setValue(event.target.files[0].name)
  }

  getPhoto(name:string|null):void{
    const img = new Image();
    img.src=localStorage[`${name}`];
    this.image=img;
  }

  onSubmitForm():void{
    this.isSubmitted = true;
    if (this.addForm.valid) {
      if (this.isUpdate) {
        this.productService
          .updateProduct(this.addForm.getRawValue())
          .subscribe({
            next: (data) => {
              this._dialogRef.close(true);
              this._snackBar.open('Edited Succesfully!', 'success');
            },
            error: (error) => {
              this._snackBar.open('Error: ' + error, 'error');
            },
          });
      } else {
        this.productService.addProduct(this.addForm.getRawValue()).subscribe({
          next: (data) => {
            this._dialogRef.close(true);
            this._snackBar.open('Added Succesfully!', 'success');
          },
          error: (error) => {
            this._snackBar.open('Error: ' + error, 'error');
            console.log(error);
          },
        });
      }
    }
  }

  onCancel():void{
    // this.addForm.reset();
  }
}
