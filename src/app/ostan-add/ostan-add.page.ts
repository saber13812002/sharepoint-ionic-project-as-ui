import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ostan-add',
  templateUrl: './ostan-add.page.html',
  styleUrls: ['./ostan-add.page.scss'],
})
export class OstanAddPage implements OnInit {


  name

  constructor(
    private rest: RestService,
  private router:Router
  ) { }

  ngOnInit() {
  }

  save() {
    this.rest.addProduct(this.name).subscribe((data: {}) => {
      console.log(data);
      let d = <any>data;
      if (d) {
        this.router.navigate(['/f1-form']);
      }
    });
  }

}
