import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { StateviewService } from '../stateview.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-people',
  template: `
  <div class="revPeople" id="revPeople" [@state]="stateviewService.state==='people'">
  <p>
    <label>* 인원을 입력하세요.</label>
    <span>
      <input type="text" id="peopleSet" value="2" (input)="changePeople.emit($event.target.value)">
      명

    </span>
  </p>
  <div class="graphBar">
    <!-- 스크롤 바가 움직이면 left값과 value 값 , 텍스트 값 변경. -->
    <div class="graphBtn ui-dragge" draggable="true"
       [ngStyle]="{ 'transform' : 'translateX('+ peoplePercent +'px)' }">2명</div>
  </div>
  <div style="width: 90%; margin-left: 5%; margin-top: -18px; font-size: 12px; font-weight: 700;">
    <span style="float: left">0명</span>
    <span style="float: right">100명</span>
  </div>
</div>
  `,
  styleUrls: [`./people.css`],
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
export class PeopleComponent implements OnInit {
  people: number;
  @Output() changePeople = new EventEmitter();
  @Input() peoplePercent;

  constructor(public stateviewService: StateviewService) { }

  ngOnInit() {
  }
}
