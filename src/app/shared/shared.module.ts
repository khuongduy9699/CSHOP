import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MuiModule } from './mui/mui.module';
import { ShowErrorPipe } from '../pipes/show-error.pipe';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [HeaderComponent, ShowErrorPipe, ImageDialogComponent, FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MuiModule,
  ],
  exports: [
    MuiModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    ShowErrorPipe,
  ]
})
export class SharedModule { }
