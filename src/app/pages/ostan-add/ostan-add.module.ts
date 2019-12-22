import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OstanAddPageRoutingModule } from './ostan-add-routing.module';

import { OstanAddPage } from './ostan-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OstanAddPageRoutingModule
  ],
  declarations: [OstanAddPage]
})
export class OstanAddPageModule {}
