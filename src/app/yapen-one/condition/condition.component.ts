import { Component, OnInit, Input } from '@angular/core';
import { StateviewService } from '../stateview.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, filter, scan, tap } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-condition',
  template: `
  <div class="reserveLayer">
  <ul>
    <li style="width:260px" class="first-li" (click)="toggle('local')">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-39-plane.png" alt="지역" class="first-img">
      <div id="schLocationText">{{ res }}</div> <!-- 클릭하면 데이터가 바뀌도록  -->
      <input type="hidden" name="schLoaction" id="schLoaction" [value]="res">
      <input type="hidden" name="schLoactionCode" id="schLoactionCode" [value]="resid">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png" alt="펼치기/닫기" class="arrowToggle last-img">
    </li>
    <li style="width:250px" (click)="toggle()">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-46-calendar.png" alt="날짜" class="first-img">
      <div id="schStartDateText">2018/07/30 (1박 2일)</div>
      <input type="hidden" name="schStartDate" id="schStartDate" value="2018/07/30">
      <input type="hidden" name="schEndDate" id="schEndDate" value="2018/07/31">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png" alt="펼치기/닫기" class="arrowToggle last-img">
    </li>
    <li style="width:260px" (click)="toggle('people')">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-500-family.png" alt="인원" class="first-img">
      <div id="schPeopleText">{{ people }}</div>
      <input type="hidden" name="schPeople" id="schPeople" [value]="people">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png" alt="펼치기/닫기" class="arrowToggle last-img">
      </li>
    <li style="width:260px" (click)="toggle('theme')">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-6-car.png" alt="테마" class="first-img">
      <div>테마 & 가격선택</div>
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png" alt="펼치기/닫기" class="arrowToggle last-img">
      </li>
    <li style="width:182px; background-color:#ff6559; height: 42px;" class="last-li">
      <img src="../assets/glyphicons_free/glyphicons/png/glyphicons-28-search.png" alt="찾기" class="first-img">
      <div>빈방찾기</div>
    </li>
  </ul>
</div>
  `,
  styleUrls: [`./condition.css`]
})
export class ConditionComponent implements OnInit {
  @Input() res: any[];
  @Input() resid: number;
  @Input() people = '전체';
  location = [];

  url = 'https://www.pmb.kr/location/location-name';

  constructor(public stateviewService: StateviewService,
              private http: HttpClient) { }

  ngOnInit() {
    // this.getLocation();
  }

  toggle(state: string) {
    if (this.stateviewService.state === state) {
      this.stateviewService.state = '';
    } else {
      this.stateviewService.state = state;
    }
  }

  searchRoom() {
    const basedUrl = 'https://www.pmb.kr/search/button_search/button_search/?';
    this.http.get<any[]>(basedUrl);
  }

  getLocation() {
    this.http.get<any[]>(this.url)
      .subscribe( res => {
        // console.log(res);
        this.res = res;
          res.filter((pension, i) => {
            if ( pension.name === '가평' || pension.name === '경기') {
                this.location.push(pension.sublocations);
                // console.log(this.location);
          }
      });
    });
  }
}
