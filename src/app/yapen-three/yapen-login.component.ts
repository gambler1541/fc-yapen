import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '../../../node_modules/@angular/router';

interface Login {
  username: string;
  password: string;
}

interface Token {
  token: string;
}

@Component({
  selector: 'app-yapen-login',
  template: `
  <ng-container *ngIf="visible">
    <div class="popup">
    <div id="logintext"> Login </div><br>
    <form [formGroup]="loginForm" class="loginsession" (ngSubmit)="login()" novalidate>
        <input class="id" type="text" placeholder="이메일 아이디" formControlName="username"><br>
        <input class="pw" type="password" placeholder="비밀번호" formControlName="password"><br>
        <button class="login" type="submit">야놀자펜션 로그인</button><br>
    </form>
      <div id="user">
        <a routerLink="/signup" (click)="ok()">회원가입</a> | <span>비밀번호 찾기</span>
      </div>

      <button class="close-btn"
        *ngIf="closable" (click)="close()">X</button>
    </div>
    <div class="overlay" (click)="close()"></div>
  </ng-container>

  `,
  styles: [`
    .loginsession {
      display: flex;
      flex-direction:column;
    }
    .id, .pw, .login {
      height: 3rem;
      width: 19rem;
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
      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14),
                  0 5px 24px 4px rgba(0, 0, 0, 0.12);
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
  // url = 'http://localhost:3000/token';
  loginForm: FormGroup;
  url = 'https://pmb.kr/members/login/';

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
  ) {}

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

  login() {
    this.loginRequest().subscribe(
      data => {
        alert('로그인이 성공.');
        this.ok(false);
        this.router.navigate(['/main']);
      },
      error => {
        alert('로그인에 실패하였습니다.');
      });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [
          Validators.required
        ]],
      password: ['', [
          Validators.required
        ]]
  });
}

  private loginRequest(): Observable<Login> {
    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    return this.http.post<Login>(this.url, payload);
  }
}
