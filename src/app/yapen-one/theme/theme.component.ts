import { Component, OnInit } from '@angular/core';
import { StateviewService } from '../stateview.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-theme',
  template: `
  <div class="revThemeLayer" id="revThemeLayer" [@state]="stateviewService.state==='theme'">
  <table cellpadding="0" cellspacing="0" class="revThemeTbl">
    <tbody>
      <tr>
        <th>가격선택</th>
        <td>
          <select name="schPrice" id="schPrice">
            <option value>가격전체</option>
            <option value="1">5만원이하</option>
            <option value="2">5~10만원</option>
            <option value="3">10~15만원</option>
            <option value="4">15~20만원</option>
            <option value="5">20~25만원</option>
            <option value="6">25~30만원</option>
            <option value="7">30~35만원</option>
            <option value="8">35~40만원</option>
            <option value="9">40~45만원</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>객실시설/테마</th>
        <td>
          <ul>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2003001" value="2003001" class="revThemeClick">
              <label for="t2003001">스파/월풀</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2003006" value="2003006" class="revThemeClick">
              <label for="t2003006">개별바베큐</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2003007" value="2003007" class="revThemeClick">
              <label for="t2003007">독채펜션</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2003003" value="2003003" class="revThemeClick">
              <label for="t2003003">복층</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2003004" value="2003004" class="revThemeClick">
              <label for="t2003004">IPTV/WIFI</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2003005" value="2003005" class="revThemeClick">
              <label for="t2003005">벽난로</label>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>부대시설</th>
        <td>
          <ul>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004001" value="2004001" class="revThemeClick">
              <label for="t2004001">수영장</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004008" value="2004008" class="revThemeClick">
              <label for="t2004008">노래방</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004011" value="2004011" class="revThemeClick">
              <label for="t2004011">빔프로젝트</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004010" value="2004010" class="revThemeClick">
              <label for="t2004010">세미나실</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004004" value="2004004" class="revThemeClick">
              <label for="t2004004">워터슬라이드</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004005" value="2004005" class="revThemeClick">
              <label for="t2004005">족구장</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004009" value="2004009" class="revThemeClick">
              <label for="t2004009">찜질방</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004014" value="2004014" class="revThemeClick">
              <label for="t2004014">바비큐장</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004015" value="2004015" class="revThemeClick">
              <label for="t2004015">캠프파이어</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004016" value="2004016" class="revThemeClick">
              <label for="t2004016">카페</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004017" value="2004017" class="revThemeClick">
              <label for="t2004017">매점/편의점</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004023" value="2004023" class="revThemeClick">
              <label for="t2004023">체육시설</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2004024" value="2004024" class="revThemeClick">
              <label for="t2004024">레포츠</label>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>서비스/기타</th>
        <td>
          <ul>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2001004" value="2001004" class="revThemeClick">
              <label for="t2001004">반려동물</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2001001" value="2001001" class="revThemeClick">
              <label for="t2001001">조식서비스</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2001002" value="2001002" class="revThemeClick">
              <label for="t2001002">식사가능</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2001003" value="2001003" class="revThemeClick">
              <label for="t2001003">이벤트가능</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2001008" value="2001008" class="revThemeClick">
              <label for="t2001008">기본양념</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2001009" value="2001009" class="revThemeClick">
              <label for="t2001009">상비약</label>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>주변관광지/체험</th>
        <td>
          <ul>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2002006" value="2002006" class="revThemeClick">
              <label for="t2002006">계곡인접</label>
            </li>
            <li>
              <input type="checkbox" name="schTheme[]" id="t2002008" value="2002008" class="revThemeClick">
              <label for="t2002008">해수욕장인근</label>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `,
  styleUrls: [`./theme.css`],
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
export class ThemeComponent implements OnInit {

  constructor(public stateviewService: StateviewService) { }

  ngOnInit() {
  }

}
