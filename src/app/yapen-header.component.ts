import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-header',
  template: `
    <!-- <a routerLink="/main">main   </a><a> | </a>
    <a routerLink="/login"> login  </a><a> | </a>
    <a routerLink="/signup">  signup</a><a> | </a> -->

    <div class="topLayer">
      <a href="#" clas="pensiontext-1" style="color: #1a0500;">
        야놀자<a href="#" class="pensiontext-2">펜션</a>
      </a>
    </div>

  `,
  styleUrls: [`./header.css`]
})
export class YapenHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
