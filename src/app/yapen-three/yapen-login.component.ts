import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'app-yapen-login',
  template: `
  <ng-container *ngIf="visible">
    <div class="popup">
    <div id="logintext"> Login </div><br>
    <div id="loginsession">
        <input class="id" type="text" placeholder="이메일 아이디"><br>
        <input class="pw" type="password" placeholder="비밀번호"><br>
        <button class="login" type="submit">야놀자펜션 로그인</button><br>
      <div id="user">
        <span>회원가입</span> | <span>비밀번호 찾기</span>
      </div>
    </div>
      <button class="close-btn"
        *ngIf="closable" (click)="close()">X</button>
    </div>
    <div class="overlay" (click)="close()"></div>
  </ng-container>


  `,
  styles: [`
    #loginsession {
      display: flex;
      flex-direction:column;
    }
    .id, .pw, .login {
      height: 5em;
      width: 30em;
    }

    .login {
      background: #FF6464;
      color: #fff;
    }

    #logintext {
      color: #FF6464;
    }

    #user {
      color: blue;
    }

    .popup {
      position: fixed;
      right: 0;
      left: 0;
      top: 20px;
      margin: 0 auto;
      width: 90%;
      max-width: 338px;
      min-height: 340px;
      background-color: #fff;
      padding: 12px;
      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
      z-index: 1000;
    }
    .overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 999;
    }
    .close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 16px;
      border: 0;
      background: transparent;
      cursor: pointer;
    }`
  ]
})
export class YapenLoginComponent implements OnInit {

  @Input() closable = true;

  // visible(two-way binding)
  @Input() visible: boolean;
  // visible change event
  @Output() visibleChange = new EventEmitter<boolean>();

  ok(value) {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    // this.popupValueChange.emit('');
  }

  ngOnInit() {

  }

}
