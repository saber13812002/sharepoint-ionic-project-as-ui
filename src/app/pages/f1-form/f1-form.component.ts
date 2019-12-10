import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-f1-form',
  templateUrl: './f1-form.component.html',
  styleUrls: ['./f1-form.component.css']
})
export class F1FormComponent implements OnInit {

  products: any = [];


  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }


  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    });
  }

  
  add() {
    this.router.navigate(['/product-add']);
  }

  delete(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
          this.getProducts();
        }, (err) => {
          console.log(err);
        }
      );
  }
  
}
