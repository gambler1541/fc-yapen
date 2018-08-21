import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StateviewService } from '../stateview.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, filter, scan, tap } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-local',
  template: `
  <div class="resLocLayer" id="resLocLayer" [@state]="stateviewService.state === 'local'" *ngIf="res">
  <table cellpadding="0" cellspacing="0" class="resLocTbl">
    <tbody>
      <tr *ngFor="let locations of res; let i = index;">
          <th>
            <label style="margin-left: 15px;">
              "{{ res[i].name }}"
              <span>({{ res[i].pensions_length }})</span>
            </label>
          </th>
          <td>
            <ul *ngFor="let subLocation of location[i]; let j = index;">
              <li data-id="{{ location[i][j].sub_location_no }}" (click)="changeArea.emit(location[i][j].name)">
                "{{ location[i][j].name }}"
                <span>({{ location[i][j].pensions_length }})</span>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styleUrls: [`./local.css`],
  animations: [
    trigger('state', [
      state('false' , style({
        transform: 'scaleY(0)',
        display: 'none'
      })),
      state('true',   style({
        transform: 'scaleY(1)',
        display: 'block'
      })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('100ms ease-out'))
    ])
  ]
})
export class LocalComponent implements OnInit {
  url = 'https://api.pmb.kr/location/location-name';
  res: any[];
  location = [];
   // 초기값 설정.

  @Output() changeArea = new EventEmitter();

  constructor(
    public stateviewService: StateviewService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getLocation();
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
