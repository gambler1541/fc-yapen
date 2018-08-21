import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yapen-calendar',
  template: `
    <ngb-datepicker #dp (select)="changeDate.emit($event)"
      class="date-picker"
      [firstDayOfWeek]="firstDayOfWeek"
      [markDisabled]="isDisabled"
      [dayTemplate]="t">
    </ngb-datepicker>

    <ng-template #t let-date="date" let-currentMonth="currentMonth"
      let-disabled="disabled">

      <span class="custom-day"
        [style.background-color]="(isDarked(date) ? '#CCC' : '')"
        [class.hidden]="date.month !== currentMonth"
        >
        {{ date.day }}
      </span>
    </ng-template>
  `,
  styles: [`
    .custom-day{
      margin: 0;
      padding: 0;
      border: 1px solid rgba(0, 0, 0, 0.125);
    }
  `]
})
export class YapenCalendarComponent implements OnInit {

  firstDayOfWeek = 7;

  selectedDate: NgbDateStruct;

  checkInDate: NgbDateStruct;

  today: Date = new Date();

  @Output() changeDate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // get new date
  getEachDate(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day + 1);
    // return eachDate;
  }

  // Make the dates before today color dark such as gray
  isDarked(date: NgbDateStruct) {
    return this.getEachDate(date).getTime() < this.today.getTime();
  }

  // Disable the dates bofre today & the months that are NOT current month
  isDisabled(date: NgbDateStruct, current: {month: number}) {
    const eachDate = new Date(date.year, date.month - 1, date.day + 1);
    const todayDate = new Date().getTime();
    return eachDate.getTime() < todayDate || date.month !== current.month;
  }



  // // when selecting a date, change to the date selected and to room status
  // onDateSelection(date: NgbDateStruct) {
  //   this.selectedDate = date;
  //   this.checkInDate = date;
  // }

}
