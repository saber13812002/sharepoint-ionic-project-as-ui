import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { F1FormPageRoutingModule } from './f1-form-routing.module';

import { F1FormPage } from './f1-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    F1FormPageRoutingModule
  ],
  declarations: [F1FormPage]
})
export class F1FormPageModule {}
