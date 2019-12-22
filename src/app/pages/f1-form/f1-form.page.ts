import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest/rest.service';


@Component({
  selector: 'app-f1-form',
  templateUrl: './f1-form.page.html',
  styleUrls: ['./f1-form.page.scss'],
})
export class F1FormPage implements OnInit {

  ostans: any = [];
  forms: any = [];


  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getOstans();
    this.getForms();
  }


  getOstans() {

    this.ostans = [];

    this.rest.getItems('ostan').subscribe((data: {}) => {
      console.log(data);
      let d = <any>data;
      if (d)
        this.ostans = d.value;
    });

  }

  getForms() {

    this.forms = [];

    this.rest.getItems('form').subscribe((data: {}) => {
      console.log(data);
      let d = <any>data;
      if (d)
        this.forms = d.value;
    });

  }


  add() {
    this.router.navigate(['/ostan-add']);
  }

  delete(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
        this.getOstans();
      }, (err) => {
        console.log(err);
      }
      );
  }

}
