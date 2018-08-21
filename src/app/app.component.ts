import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-yapen-nav></app-yapen-nav>,
  <app-yapen-header></app-yapen-header>,
  <app-yapen-searchbar></app-yapen-searchbar>,
  <!-- <app-slide></app-slide>,
  <app-yapen-pensionlist></app-yapen-pensionlist>,-->
  <app-yapen-roomlist></app-yapen-roomlist>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
