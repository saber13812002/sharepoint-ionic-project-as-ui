import { Component } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  add() {
    this.router.navigate(['/ostan-add']);
  }
}
