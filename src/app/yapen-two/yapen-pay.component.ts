import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-pay',
  template: `
    <p> yapen-pay works! </p>
    <a routerLink="/payfinish">payfinish</a>
  `,
  styles: []
})
export class YapenPayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
