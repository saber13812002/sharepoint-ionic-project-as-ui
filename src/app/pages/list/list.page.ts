import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  dores: any = [];

  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public rest:RestService) {
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  
  ionViewDidEnter() {
    this.getDore();
  }

  getDore(){
    
    this.dores = [];
    this.rest.getItems('dore').subscribe((data: {}) => {
      console.log(data);
      let d = <any>data;
      if (d)
        this.dores = d.value;
    });

  }
}
