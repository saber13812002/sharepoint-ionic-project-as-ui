import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { F1FormPage } from './f1-form.page';

const routes: Routes = [
  {
    path: '',
    component: F1FormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F1FormPageRoutingModule {}
