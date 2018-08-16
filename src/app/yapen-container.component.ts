import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-container',
  template: `
  <p> yapen container works ! </p>
  <a routerLink="/pensionlist">pensionlist</a>
  `,
  styles: []
})
export class YapenContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
