import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-pensiondetail',
  template: `
    <p> yapen-pensiondetail works! </p>
    <a routerLink="/reserve">reserve</a>
  `,
  styles: []
})
export class YapenPensiondetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
