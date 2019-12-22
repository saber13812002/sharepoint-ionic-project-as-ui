import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OstanAddPage } from './ostan-add.page';

const routes: Routes = [
  {
    path: '',
    component: OstanAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OstanAddPageRoutingModule {}
