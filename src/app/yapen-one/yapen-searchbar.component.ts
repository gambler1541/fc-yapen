import { Component, OnInit } from '@angular/core';

interface Area {
  name: string;
  pensions_length: number;
  sub_location_no: string;
}

@Component({
  selector: 'app-yapen-searchbar',
  template: `
  <app-condition [res]="res" [resid]="resid" [people]="people"></app-condition>
  <app-local (changeArea)="changeArea($event)"></app-local>
  <app-people (changePeople)="changePeople($event)" [peoplePercent]="peoplePercent"></app-people>
  <app-searchcalendar></app-searchcalendar>
  <app-theme></app-theme>
  <!-- 클릭 후 서치바 추가하기. -->
  <!-- 달력 넣기-->
  `,
  styleUrls: [`./yapen-searchbar.css`]
})
export class YapenSearchbarComponent {
  res = '양평';
  resid = '1.001010';
  people = '전체';
  peoplePercent = 0;

  constructor() {
   }

   changeArea(area: Area) {
     this.res = area.name;
     this.resid = area.sub_location_no;
   }

   changePeople(peo: string) {
    let p = +peo;
    if (p > 100) {
      p = 100;
      alert('100명 이하로 입력하세요.');
    } else if (p < 0) {
      p = 0;
    }
    this.people = p + '명';

    if (p === 0) {
      this.people = '전체';
    }
    this.peoplePercent = p * 10.02;
    console.log(peo);
  }
}
