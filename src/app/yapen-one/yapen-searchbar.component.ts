import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-searchbar',
  template: `
  <div class="searchbar">
    <input type="text" class="sbText" autocomplete="off" autocorrect="off"
      spellcheck="false" id="sbText" value placeholder="가고 싶은 여행지를 입력하세요.">
  </div>
  `,
  styleUrls: []
})
export class YapenSearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
