import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-reserve',
  template: `
    <!-- reserve page -->
    <div class="reserve-page">

    <!-- reserve calendar & basic info -->
    <div class="reserve-info">

      <!-- reserve calendar -->
      <section class="reserve-calendar">

      </section>
      <!-- reserve calendar -->

      <!-- reserve basic info table -->
      <section class="reserve-basic-info">
        <p class="today-date">오늘 <span>2018년 8월
          19일</span> <span>(일)</span></p>
        <table class="basic-info-table table-bordered">
          <tbody>
            <tr>
              <th scope="row">펜션명</th>
              <td>가평 나르샤의정원펜션</td>
            </tr>
            <tr>
              <th scope="row">주소</th>
              <td>경기 가평군 상면 임초리 130</td>
            </tr>
            <tr>
              <th scope="row">결제방법</th>
              <td>카드 / 무통장</td>
            </tr>
            <tr>
              <th scope="row">요금타입</th>
              <td><span>2018월 19일 (일)</span>
                    은 주말 요금이 적용됩니다.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- reserve basic info table -->

    </div>
    <!-- reserve calendar & basic info -->

    <!-- date selected -->
    <div class="select-date">
      <p>선택일: <span>2018-08-19</span>
        <span>(일)</span></p>
    </div>
    <!-- date selected -->

    <!-- room info -->
    <div class="room-info">

      <!-- room info table -->
      <table class="room-info-table table-bordered">

        <!-- table header -->
        <thead class="thead-light">
          <tr>
            <th scope="col">객실명</th>
            <th scope="col">상태</th>
            <th scope="col">크기/인원</th>
            <th scope="col">기간</th>
            <th scope="col">인원</th>
            <th scope="col">기본금액</th>
            <th scope="col">이용금액</th>
          </tr>
        </thead>
        <!-- table header -->

        <!-- rooms in table -->
        <tbody>


          <!-- for each room -->
          <tr>
            <td class="room-name">
              <span>
                <input type="checkbox" id="1" checked>
                <label for="1">아쿠아(독채,복층)</label>
              </span>
            </td>
            <td><button type="button" class="btn btn-danger btn-sm">
              예약가능</button></td>
            <td>15평, 2명 / 3명</td>
            <td>

              <!-- for period -->
              <div class="input-group mb-3">
                <select class="custom-select" id="1"
                class.disabled-select>
                </select>
              </div>
              <!-- for period -->

            </td>
            <td>

              <!-- the number of people for each room -->
              <span>성인:
                <select class="custom-select" id="1">
                </select>
              </span>

              <span> 아동:
                <select class="custom-select" id="1">
                </select>
              </span>

              <!-- [value]="(room.pk===checkedPk ? k : room.normal_num_poeple)" -->

              <span> 유아:
                <select class="custom-select" id="1">
                </select>
              </span>
              <!-- the number of people for each room -->

            </td>
            <td class="basic-price"> 149000원</td>
            <td>149000원</td>


          </tr>
          <!-- for each room -->


          </tbody>
          <!-- rooms in table -->

      </table>
      <!-- room info table -->

      <!-- total price for the room selected -->
      <div class="total-price">
        <p>
          <strong>결제금액:</strong>
          <span>0</span>
          <span>원</span>
        </p>
        <span></span>
      </div>
      <!-- total price for the room selected -->

    </div>
    <!-- room info -->

    <!-- reserve button -->
    <div class="reserve-btn">
      <button type="button" class="btn btn-primary btn-lg" (click)="addReserveRoom()">예약하기</button>
    </div>
    <!-- reserve button -->

  </div>
  <!-- reserve page -->

  `,
  styles: []
})
export class YapenReserveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
