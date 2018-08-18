import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-yapen-header',
  template: `
    <a routerLink="/main">main   </a><a> | </a>
    <app-yapen-login [(visible)]="visible"></app-yapen-login>
    <button (click)="visible=!visible"> login </button><a> | </a>
    <a routerLink="/signup">  signup</a><a> | </a>
    `,
  styles: []
})
export class YapenHeaderComponent {
  @Input()
  visible: boolean = false;
}
