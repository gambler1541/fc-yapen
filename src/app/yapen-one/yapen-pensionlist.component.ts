import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-pensionlist',
  template: `
    <p> yapen-pensionlist works! </p>
    <a [routerLink]="['/reserve/', 1, '2018-08-19']">reserve</a><br>
    <a routerLink="/pensiondetail">pensiondetail</a>
  `,
  styles: []
})
export class YapenPensionlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

