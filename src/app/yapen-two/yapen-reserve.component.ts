import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Router } from '@angular/router';

interface Pension {
  pk: number;
  name: string;
  address: string[];
  rooms: Room[];
}

interface Room {
  pk: number;
  name: string;
  size: number;
  normal_num_poeple: number;
  max_num_people: number;
  price: number;
  extra_charge_adult: number;
  extra_charge_child: number;
  extra_charge_baby: number;
  status: boolean;
}

@Component({
  selector: 'app-yapen-reserve',
  template: `
    <!-- reserve page -->
    <div class="reserve-page">

    <!-- reserve calendar & basic info -->
    <div class="reserve-info">

      <!-- reserve calendar -->
      <section class="reserve-calendar">

        <app-yapen-calendar
        (changeDate)="onDateSelection($event)"
        ></app-yapen-calendar>

      </section>
      <!-- reserve calendar -->

      <!-- reserve basic info table -->
      <section class="reserve-basic-info">
        <p class="today-date">오늘 <span>{{ today.getFullYear() }}년 {{ today.getMonth() + 1 }}월
          {{ today.getDate() }}일</span> <span>({{ getWeekDay(today) }})</span></p>
        <table class="basic-info-table table-bordered">
          <tbody>
            <tr>
              <th scope="row">펜션명</th>
              <td class="pension-name">{{ pensionName }}</td>
            </tr>
            <tr>
              <th scope="row">주소</th>
              <td>{{ pensionAddress }}</td>
            </tr>
            <tr>
              <th scope="row">결제방법</th>
              <td>카드 / 무통장</td>
            </tr>
            <tr>
              <th scope="row">요금타입</th>
              <td><span style="color: #FF6559;">{{ selectedDate.month }}월 {{ selectedDate.day }}일 ({{ selectedDateWeekDay() }})</span>
                    은 <span style="color: #FF6559;">{{ isWeekend(selectedDate) ? '주말' : '주중' }}</span>요금이 적용됩니다.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- reserve basic info table -->

    </div>
    <!-- reserve calendar & basic info -->

    <!-- date selected -->
    <div class="select-date">
      <p>선택일: <span>{{ selectedDate.year }}-{{ selectedDate.month }}-{{ selectedDate.day }}</span>
        <span>({{ selectedDateWeekDay() }})</span></p>
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
          <tr *ngFor="let room of rooms" [class.bg-color]="room.pk===checkedPk">
            <td class="room-name">
              <span>
                <input type="checkbox" [attr.id]="room.pk" [checked]="room.pk===checkedPk"
                (change)="changeRoom(room.pk, selectStayNum.value, selectAdultNum.value,
                  selectChildNum.value, selectBabyNum.value)" [disabled]="!room.status">
                  <label [attr.for]="room.pk">{{ room.name }}</label>
              </span>
            </td>
            <td><button type="button" class="btn btn-{{ room.status ? 'danger' : 'success'}} btn-sm">
              {{ room.status ? '예약가능': '예약완료' }}</button></td>
            <td>{{ room.size }}, {{ room.normal_num_poeple }}명 / {{ room.max_num_people }}명</td>
            <td>

              <!-- for period -->
              <div class="input-group mb-3">
                <select class="custom-select" [attr.id]="room.pk" class="selectStayBox"
                [disabled]="!(room.pk===checkedPk)" [class.disabled-select]="!(room.pk===checkedPk)"
                (change)="selectPeriod($event.target.value)" #selectStayNum>
                <ng-container *range="[1, 6] let stayNum;">
                  <option [value]="stayNum">{{ stayNum }}박</option>
                </ng-container>
                </select>
              </div>
              <!-- for period -->

            </td>
            <td>

              <!-- the number of people for each room -->
              <span>성인:
                <select class="custom-select" [attr.id]="room.pk"
                  [disabled]="!(room.pk===checkedPk)" [class.disabled-select]="!(room.pk===checkedPk)"
                  (change)="selectAdult($event.target.value)" #selectAdultNum>
                <ng-container *range="[room.normal_num_poeple, room.max_num_people]; let adultNum">
                  <option [value]="adultNum">{{ adultNum }}명</option>
                </ng-container>
                </select>
              </span>

              <span> 아동:
                <select class="custom-select" [attr.id]="room.pk"
                  [disabled]="!(room.pk===checkedPk)" [class.disabled-select]="!(room.pk===checkedPk)"
                  (change)="selectChild($event.target.value)" #selectChildNum>
                <ng-container *range="[0, room.max_num_people]; let childNum">
                  <option [value]="childNum">{{ childNum }}명</option>
                </ng-container>
                </select>
              </span>

              <span> 유아:
                <select class="custom-select" [attr.id]="room.pk"
                  [disabled]="!(room.pk===checkedPk)" [class.disabled-select]="!(room.pk===checkedPk)"
                  (change)="selectBaby($event.target.value)" #selectBabyNum>
                  <ng-container *range="[0, room.max_num_people]; let babyNum">
                    <option [value]="babyNum">{{ babyNum }}명</option>
                  </ng-container>
                </select>
              </span>
              <!-- the number of people for each room -->

            </td>
            <td class="basic-price">{{ room.price }}원</td>
            <td>{{ room.price }}원</td>


          </tr>
          <!-- for each room -->


          </tbody>
          <!-- rooms in table -->

      </table>
      <!-- room info table -->

      <!-- total price for the room selected -->
      <div class="total-price" *ngIf="rooms">
        <p>
          <b>결제금액:</b>
          <strong>{{ totalPrice }}원</strong>
        </p>
        <span>{{ extraChargeTotal ? '현장결제:' + extraChargeTotal + '원': '' }}</span>
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

  <pre>{{ rooms | json }}</pre>

  `,
  styles: [`
    .reserve-page{
      margin: 0;
      padding: 0;
      line-height: 1.3;
      font-size: 12px;
      font-family: dotum, 맑은 고딕, "Malgun Gothic", "맑은 고딕", Tahoma, Geneva, sans-serif;
      word-break: break-all;
      color: #444;
    }
    .reserve-info{
      position: relative;
      min-height: 308px;
      margin: 24px 10px;
    }
    .reserve-calendar{
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 40px;
    }
    .reserve-basic-info{
      padding: 15px 0 0 310px;
    }
    .reserve-basic-info .today-date{
      float: right;
      margin: 0 10px 13px 0;
    }
    .basic-info-table{
      width: 100%;
      height: 150px;
    }
    .basic-info-table th{
      background: #f7f7f7;
      padding-left: 20px;
      width: 90px;
    }
    .basic-info-table td{
      padding-left: 20px;
    }
    .pension-name{
      color: #ff6559;
      font-weight: bold;
    }
    .select-date{
      margin: 10px 10px;
    }
    .select-date span{
      font-size: 16px;
      color: #ff6559;
      font-weight: bold;
    }
    .room-info{
      margin: 24px 10px;
    }
    .room-info-table{
      width: 100%;
    }
    .room-info-table th{
      background: #f7f7f7;
      height: 50px;
      border-top: 2px solid #555;
      border-bottom: 1px solid #bbb;
      text-align: center;
    }
    .room-info-table tr{
      height: 50px;
      text-align: center;
    }
    .bg-color{
      background-color: rgb(244, 248, 254);
    }
    .room-name label{
      margin-left: 5px;
    }
    .selectStayBox{
      margin-left: 10px;
    }
    .total-price{
      padding: 29px 15px 0 0;
      text-align: right;
      font-size: 16px;
    }
    .total-price strong{
      color: #ff6559;
      margin-left: 5px;
    }
    .total-price span{
      color: #4491cc;
      margin-left: 5px;
    }
    .reserve-btn{
      margin: 70px auto;
      text-align: center;
    }
    .reserve-btn button{
      padding: 10px 100px;
      font-weight: bold;
      font-size: 14px;
      border-radius: 3px;
      background: #ff6559;
      color: #fff;
    }
    .btn-primary{
      border-color: white;
    }
    .disabled-select {
      color: #888;
    }
  `]
})
export class YapenReserveComponent implements OnInit {

  firstDayOfWeek = 7;

  today: Date = new Date();

  selectedDate: NgbDateStruct;

  checkInDate: NgbDateStruct;

  pensions: Pension;

  pensionPk: number;

  rooms: Room[];

  urlDate = 'https://api.pmb.kr/reservation';

  urlInfo = 'https://api.pmb.kr/reservation/info/';

  checkedPk = 1;

  stayDayNum = 1;

  adultNum: number;

  childNum = 0;

  babyNum = 0;

  totalPrice = 0;

  extraChargeTotal = 0;

  pensionName: string;

  pensionAddress: string;

  initalDate: Date;

  dateDay;

  checkDayNum: number;

  // set initial date as today date
  constructor(calendar: NgbCalendar, private http: HttpClient, private activateRoute: ActivatedRoute, private router: Router) {
    this.selectedDate = calendar.getToday();
    this.getWeekDay(this.today);
    this.checkInDate = calendar.getToday();

    activateRoute.params.subscribe(params => {
      this.pensionPk = params['pk'];
      this.initalDate = params['date'];
    });
  }

  ngOnInit() {
    // for nested array -> rooms in pension
    this.http.get<Pension>(`${this.urlDate}/${this.pensionPk}/${this.initalDate}/`)
    .subscribe(pension => {
      this.pensionPk = pension.pk;
      this.pensionName = pension.name;
      this.pensionAddress = pension.address[0];
      this.rooms = pension['rooms'];

      const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
      this.adultNum = checkedRoom.normal_num_poeple;

      this.totalPrice = checkedRoom.price;
  });
}

  // --- Calendar Implementation Start ---

  // when selecting a date, change to the date selected and to room status
  onDateSelection(date: NgbDateStruct) {
    this.selectedDate = date;
    this.checkInDate = date;
    const calendarSelectedDate = `${date.year}-0${date.month}-${date.day}`; // 2018-08-20
    this.http.get<Pension>(`${this.urlDate}/${this.pensionPk}/${calendarSelectedDate}/`)
      .subscribe(pension => this.rooms = pension.rooms);
  }

  // get weekday(요일) as string
  getWeekDay(date: Date) {
    const weekDayDate = date;
    const weekDayNumber = weekDayDate.getDay();
    return weekDayNumber === 0 ? '일' : weekDayNumber === 1 ? '월' :
            weekDayNumber === 2 ? '화' :  weekDayNumber === 3 ? '수' :
            weekDayNumber === 4 ? '목' :  weekDayNumber === 5 ? '금' : '토';
  }

  // get weekday for date selected
  selectedDateWeekDay() {
    const calendarDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
    return this.getWeekDay(calendarDate);
  }

  // for weekend
  isWeekend(date: NgbDateStruct) {
    const eachDate = new Date(date.year, date.month - 1, date.day);
    return eachDate.getDay() === 0 || eachDate.getDay() === 6;
  }


  // --- Calendar Implementation End ---


  // --- Room Table Implementation Start ---

  // make the room selected
  changeRoom(selectedPk: number, selectStayNum: number, selectAdultNum: number, selectChildNum: number, selectBabyNum: number) {
    this.checkedPk = selectedPk;
    this.stayDayNum = selectStayNum;
    this.adultNum = selectAdultNum;
    this.childNum = selectChildNum;
    this.babyNum = selectBabyNum;

    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
    this.totalPrice = checkedRoom.price * this.stayDayNum;
  }

  // When selecting a period(1박)
  selectPeriod(selectedStayNum: number) {
    this.stayDayNum = selectedStayNum;

    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
    this.totalPrice = checkedRoom.price * this.stayDayNum;
  }

  // show alert if the sum of adult, child, and baby is higher than the max number of the room selected
  exceedAlert() {
    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
    const totalNum = Number(this.adultNum) + Number(this.childNum) + Number(this.babyNum);

    if (checkedRoom.max_num_people < totalNum) {
      return window.alert(`최대인원 ${checkedRoom.max_num_people}보다 초과되었습니다. 다시 입력 바랍니다.`);
    }
  }

  selectAdult(selectedAdultNum: number) {
    this.adultNum = selectedAdultNum;
    this.exceedAlert();

    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];

    if (selectedAdultNum > checkedRoom.normal_num_poeple) {
      const _extraChargeAdult = (selectedAdultNum - checkedRoom.normal_num_poeple) * (checkedRoom.extra_charge_adult);
      this.extraChargeTotal += _extraChargeAdult;
    }
  }

  selectChild(selectedChildNum: number) {
    this.childNum = selectedChildNum;
    this.exceedAlert();

    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];

    if (selectedChildNum > 0) { // 3명 > 2명
      const _extraChargeChild = (selectedChildNum) * (checkedRoom.extra_charge_child);
      this.extraChargeTotal += _extraChargeChild;
    }
  }

  selectBaby(selectedBabyNum: number) {
    this.babyNum = selectedBabyNum;
    this.exceedAlert();

    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];

    if (selectedBabyNum > 0) { // 3명 > 2명
      const _extraChargeBaby = (selectedBabyNum) * (checkedRoom.extra_charge_baby);
      this.extraChargeTotal += _extraChargeBaby;
    }
  }

  roomStatusAlert() {
    console.log('status');
    if (this.stayDayNum > 1) {
      this.checkDayNum = this.stayDayNum; // 3
      this.dateDay = this.checkInDate.day;
      this.getNextDay(this.dateDay);
  } else {
    this.postReserveRoom();
  }
}

  getNextDay(day) {
    const nextDay = day + 1; // +1 / +2
    this.dateDay = nextDay;
    const nextDayDate = `${this.checkInDate.year}-0${this.checkInDate.month}-${nextDay}`;
    this.checkDayNum === 1 ? this.postReserveRoom() : this.findRoomStatus(nextDayDate);
    this.checkDayNum = this.checkDayNum - 1;
  }

  findRoomStatus(eachDate) {
    this.http.get<Pension>(`${this.urlDate}/${this.pensionPk}/${eachDate}/`)
    .subscribe(pension => {
      const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
      console.log(pension); // {pk: 1, name: "가평 폴라리스펜션[17.11월리모델링]", address: Array(1), rooms: Array(4)}
      pension.rooms.forEach(room => {
        if (checkedRoom.name === room.name) {
          console.log(room.status);
          if (!room.status) {
            return window.alert('이미 다른분이 예약하셨습니다!');
          } else {
            this.getNextDay(this.dateDay);
          }
        }
      });
    });
  }

  postReserveRoom() {
      const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
      const finalCheckInDate = `${this.checkInDate.year}-${this.checkInDate.month}-${this.checkInDate.day}`;

      const newReserveRoom = {
        pk: checkedRoom.pk,
        checkin_date: finalCheckInDate,
        stay_day_num: this.stayDayNum,
        adult_num: this.adultNum,
        child_num: this.childNum,
        baby_num: this.babyNum,
        total_price: this.totalPrice,
        name: checkedRoom.name,
        size: checkedRoom.size,
        normal_num_poeple: checkedRoom.normal_num_poeple,
        max_num_people: checkedRoom.max_num_people
      };

      this.http.post(this.urlInfo, newReserveRoom)
        .subscribe(
          () => {
            alert('예약이 성공했습니다.');
            this.router.navigate(['pay']);
          },
          error => {
            alert('예약이 실패되었습니다.');
          }
        );
    }

  // add a room selected to reservation database
  addReserveRoom() {
    const checkedRoom = this.rooms.filter(room => room.pk === this.checkedPk)[0];
    const totalNum = Number(this.adultNum) + Number(this.childNum) + Number(this.babyNum);

    if (checkedRoom.max_num_people < totalNum) {
      return window.alert(`최대인원 ${checkedRoom.max_num_people}보다 초과되었습니다. 다시 입력 바랍니다.`);
    } else {
      this.roomStatusAlert();
    }
  }

  // --- Room Table Implementation End ---

}
