import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePage } from './create.page';
import { SelectAllDirective } from './select-all';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CreatePage }]),
    TagInputModule,
  ],
  declarations: [CreatePage, SelectAllDirective]
})
export class CreatePageModule {}
