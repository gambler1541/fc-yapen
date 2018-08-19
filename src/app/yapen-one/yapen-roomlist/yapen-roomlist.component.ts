import { Component, OnInit } from '@angular/core';
import { StateviewService } from '../stateview.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, scan, tap } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-yapen-roomlist',
  template: `
    <div class="yapenRoomContainer" id="yapenRoomContainer" style="width: 1222px; left: 43px;">
    <!-- search room list -->
      <input type="hidden" id="pensionTotalCount" value="">
      <div class="yapen-searchContainer">
        <div class="yapen-searchLayer">
          <div class="yapen-searchPension">
            <table cellpadding="0" cellspacing="0" class="yapen-pensionTbl">
              <tbody>
                <tr>
                  <td class="yapen-pensionImageLayer" onclick="pensionView">
                    <div class="yapen-pensionImage" style="background:url('') no-repeat center center;
                      background-size: 100% auto;"></div>
                    <div class="yapen-pensionName">가평 로렌시아 펜션</div>
                  </td>
                  <td class="yapen-pensionRoomLayer">
                    <table cellpadding="0" cellspacing="0" class="yapen-pensionRoomTbl">
                      <thead>
                        <tr>
                          <th class="yapen-roomName">객실명</th>
                          <th>크기</th>
                          <th>기준/최대</th>
                          <th>요금</th>
                          <th class="yapen-reserve"></th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td class="yapen-roomMame" onclick="yapenRoomphoto">
                          <div class="roomPic"></div>
                          <div class="yapen-roomNameLayer">쥬땜므(복층)</div>
                        </td>
                        <td>10층</td>
                        <td>2명/6명</td>
                        <td class="yapen-price">
                          <div class="yapen-priceLayer">
                            <div class="yapen-basicPrice">220,000원</div>
                          </div>
                        </td>
                        <td class="yapen-reserve" onclic>
                          <div class="reserveArrow"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: [`./yapen-roomlist.css`]
})
export class YapenRoomlistComponent implements OnInit {
  url: 'https://www.pmb.kr/location';
  res: any[];

  constructor(public stateviewService: StateviewService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  getRoom() {
    this.http.get<any[]>(`${this.url}/{sub_location_no}/{pk}`)
      .subscribe( res => {
        this.res = res;
        console.log(res);
      });
  }
}
