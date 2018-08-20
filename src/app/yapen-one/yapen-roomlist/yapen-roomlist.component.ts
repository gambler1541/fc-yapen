import { Component, OnInit } from '@angular/core';
import { StateviewService } from '../stateview.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, filter, scan, tap } from 'rxjs/operators';

@Component({
  selector: 'app-yapen-roomlist',
  template: `
  <div class="yapenRoomContainer" id="yapenRoomContainer" style="width: 1222px; left: 43px;">
    <!-- search room list -->
    <input type="hidden" id="pensionTotalCount" value>
    <div class="yapen-searchContainer">
      <div class="yapen-searchLayer">
        <div class="yapen-searchPension">
          <table cellpadding="0" cellspacing="0" class="yapen-pensionTbl" *ngFor="let room of roomlist;">
            <tbody>
              <tr>
                <td class="yapen-pensionImageLayer" onclick="pensionView" data-id="{{ room.pk }}">
                  <img src="{{ room.pensionimages[0].pension_image }}" class="yapen-pensionImage">
                  <div class="yapen-pensionName">{{ room.name }}</div>
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
                      <tr *ngFor="let r of room.rooms;">
                        <td class="yapen-roomMame" onclick="yapenRoomphoto">
                          <div class="roomPic">{{ r.name }}</div>
                          <div class="yapen-roomNameLayer"></div>
                        </td>
                        <td>{{ r.size }}</td>
                        <td>{{ r.normal_num_poeple }}/{{ r.max_num_people }}</td>
                        <td class="yapen-price">
                          <div class="yapen-priceLayer">
                            <div class="yapen-basicPrice">{{ r.price }}</div>
                            </div>
                        </td>
                        <td class="yapen-reserve">
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
  url = 'https://www.pmb.kr/search/button_search';

  roomlist: any[];

  constructor(public stateviewService: StateviewService,
              private http: HttpClient) { }

  ngOnInit() {
    this.getRoomlist();
  }

  getRoomlist() {
    this.http.get<any[]>(this.url)
      .subscribe( res => {
        this.roomlist = res;
        console.log(res);
      });
  }
}
