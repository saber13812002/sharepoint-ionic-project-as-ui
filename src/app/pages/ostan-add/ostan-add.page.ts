import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { Router } from '@angular/router';
import { Form11Model } from '../../models/form11Model';

@Component({
  selector: 'app-ostan-add',
  templateUrl: './ostan-add.page.html',
  styleUrls: ['./ostan-add.page.scss'],
})
export class OstanAddPage implements OnInit {


  name
  data: Form11Model = new Form11Model();

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  change(datePicker) {
    datePicker.open();
  }

  save() {
    this.rest.addItem('Form1', this.data).subscribe((data: {}) => {
      console.log(data);
      let d = <any>data;
      if (d) {
        this.router.navigate(['/f1-form']);
      }
    });
  }

}
