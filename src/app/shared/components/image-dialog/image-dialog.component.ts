import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { imageSrc: string }){}

  getPhoto() {
    const img = new Image();
    img.src=localStorage[`${this.data.imageSrc}`];
    return img.src
  }
}
