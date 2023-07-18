import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryDTO } from 'src/api/category/category.dto';
import { CategoryService } from 'src/app/services/category/category.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit, DoCheck {
  addForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    image: ['', [Validators.required]],
  }, {updateOn: 'blur'});
  isSubmitted = false;
  isUpdate = false;
  image = new Image();

  get name() {
    return this.addForm.get("name");
  }

  get img() {
    return this.addForm.get("image");
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private _dialogRef: MatDialogRef<AddCategoryComponent>,
    private _snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA)
    public data: { data?: CategoryDTO; isUpdate: boolean }
  ) {}

  ngOnInit(): void {
    if (this.data.data) {
      this.addForm.setValue({
        _id: this.data.data._id,
        name: this.data.data.name,
        image: this.data.data.image,
      });
      this.getPhoto(this.data.data.image);
    }
    this.isUpdate = this.data.isUpdate;
  }

  ngDoCheck(): void {
    if(this.addForm.getRawValue().image)
    this.getPhoto(this.addForm.getRawValue().image);
  }

  onLoadImage(event: any):void{
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); //attempts to read the file in question.
    reader.onload = function (e) {
      // Create a new image.
      localStorage[`${event.target.files[0].name}`] =  reader.result; //stores the image to localStorage
    };
    this.addForm.controls.image.setValue(event.target.files[0].name);
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
        this.categoryService
          .updateCategory(this.addForm.getRawValue())
          .subscribe({
            next: (data) => {
              this._dialogRef.close(true);
              this._snackBar.open('Edited Succesfully!', 'success');
            },
            error: (error)=>{
              this._snackBar.open('Error: ' + error, 'error');
            }
          });
      } else {
        this.categoryService.addCategory(this.addForm.getRawValue()).subscribe({
          next: (data) => {
            this._dialogRef.close(true);
            this._snackBar.open('Added Succesfully!', 'success');
          },
          error: (error)=>{
            this._snackBar.open('Error: ' + error, 'error');
          }
        });
      }
    }
  }

  onCancel():void{
    this.addForm.reset();
  }
}
