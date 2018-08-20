import { Component, OnInit } from '@angular/core';
import { StateviewService } from './yapen-one/stateview.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, filter, scan, tap } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-yapen-nav',
  template: `
  <div class="yapenGuideHead" style="width: 1260px; left: 43px;">
    <div class="navLayer">
      <ul class="nav justify-content-end">
        <div class="nav-li">
          <li class="nav-item">
            <a class="nav-link active" href="#">야놀자펜션</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">회원가입</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">로그인</a>
          </li>
        </div>
        <div class="searchbar">
          <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-28-search.png" alt="지역" class="first-img">
          <input type="text" class="sbText" autocomplete="off" autocorrect="off"
            spellcheck="false" id="sbText" value placeholder="업체 / 지역 / 펜션명" #searchBox (keyup.enter)="search(searchBox.value)">
        </div>
      </ul>
    </div>
  </div>
  `,
  styleUrls: [`./nav.css`]
})
export class YapenNavComponent implements OnInit {

  constructor(public stateviewService: StateviewService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  search(value: string) {
    console.log(value);
    const baseUrl = 'https://pmb.kr/search/keyword_search/?search=' + value;

    this.http.get<any[]>(baseUrl)
    .subscribe( res => {
      this.stateviewService.pensionList = res;
    });
  }
}
