import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-reserve',
  template: `
    <p> yapen-reserve works! </p>
    <a routerLink="/pay">pay</a>
  `,
  styles: []
})
export class YapenReserveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
