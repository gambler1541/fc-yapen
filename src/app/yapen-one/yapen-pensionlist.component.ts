import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StateviewService } from './stateview.service';
import { Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-yapen-pensionlist',
  template: `
  <main class="yapenMaincontainer" style="background-color: #f4f4f4;">
    <div class="yapenMainLayer">
      <div class="yapenMaintitle">추천 펜션</div>
      <div class="yapenMainTooltip" style="display: none;">추천 펜션 영역 입니다.</div>
      <table class="pensionMainTbl" cellpadding="0" cellspacing="0" >
        <tbody>
          <tr>
            <td onclick="mainTopBanner" data-id="{{ pension.pk }}"
                *ngFor="let pension of stateviewService.pensionList">
              <img src="{{ pension.pension_image_thumbnail }}" alt="추천" class="pensionImg">
              <div class="pensionInfo">
                <div class="pensionName">{{ pension.name }}</div>
                <div class="pensionPrice">{{ pension.lowest_price }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>

  <!-- {{ res | json }} -->
    <a routerLink="/reserve">reserve</a><br>
    <a routerLink="/pensiondetail">pensiondetail</a>
  `,
  styleUrls: [`./pensionlist.css`]
})

export class YapenPensionlistComponent implements OnInit {
  url = 'https://www.pmb.kr/location';
  res: any[];
  // pensionList: any[];

  constructor( public stateviewService: StateviewService,
    private http: HttpClient) {
      // this.stateviewService.searchTerms(this.searchTerm$)
      // .subscribe(results => {
      //   console.log(results);
      //   // this.results = results.results;
      // });
    }

  ngOnInit() {
    this.pensions();
  }

  pensions() {
    this.http.get<any[]>(this.url)
      .subscribe( res => {
        this.stateviewService.pensionList = res;
        // this.res = res;
        // res.filter((pension, index) => {
        //   // if (pension.name === '가평' && pension.sublocations[index].sub_location_no === '1.015002') {
        //     // this.pensionList = res.map(p => ({ ...p, pension_image_thumbnail : 'http://placehold.it/420x380' }));
        //     // 이미지 조정되면 없앨 코드.
        //   // }
        //   return false;
        // });
        // console.log(this.stateviewService.pensionList);
      });
  }


}



