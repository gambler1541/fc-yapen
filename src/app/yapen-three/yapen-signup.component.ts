import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { PasswordValidator } from './password-validator';

interface Signup {
  username: string;
  password: string;
  password2: string;
  phone_number: any;
}

@Component({
  selector: 'app-yapen-signup',
  providers: [NgbTooltipConfig],
  template: `
  <h3> 회원가입 </h3>
    <form [formGroup]="signupForm" (ngSubmit)="signUp()" novalidate>
      <input class="username" type="email" placement="right" placeholder="이메일을 입력해주세요" formControlName="username"><br>
        <div class="alert-box">
          <em *ngIf="username.errors?.pattern"> email을 형식에 맞춰 입력해주세요! </em>
          <em *ngIf="username.errors?.required && username.touched"> email을 입력하세요! </em>
        </div>
      <input class="phone_number" type="tel" placement="right"  placeholder="전화번호를 입력해주세요" formControlName="phone_number"><br>
        <div class="alert-box">
          <em *ngIf="phone_number.errors?.pattern"> 핸드폰 번호는 숫자로 입력해주세요! </em>
          <em *ngIf="phone_number.errors?.minlength && !phone_number.errors?.pattern"> 핸드폰 번호는 10자 혹은 11자로 입력해주세요! </em>
          <em *ngIf="phone_number.errors?.maxlength && !phone_number.errors?.pattern"> 핸드폰 번호는 10자 혹은 11자로 입력해주세요! </em>
          <em *ngIf="phone_number.errors?.required && phone_number.touched"> 전화번호를 입력하세요! </em>
        </div>
      <div formGroupName="passwordGroup">
      <input class="password" type="password" placement="right" placeholder="비밀번호를 입력해주세요" formControlName="password"><br>
        <div class="alert-box">
          <em *ngIf="password.errors?.pattern"> 반드시 영어 소문자, 대문자, 숫자 그리고 특수문자 조합으로 입력해주세요! </em>
          <em *ngIf="password.errors?.minlength && !password.errors?.pattern"> 비밀번호는 최소 8자리로 입력해주세요! </em>
          <em *ngIf="password.errors?.maxlength && !password.errors?.pattern"> 비밀번호는 최대 12자리로 입력해주세요! </em>
          <em *ngIf="password.errors?.required && password.touched"> 비밀번호를 입력하세요! </em>
        </div>
      <input class="password2" type="password" placement="right" placeholder="비밀번호를 한번 더 입력해주세요" formControlName="password2"><br>
      <div class="alert-box">
        <em *ngIf="passwordGroup.errors?.match && password2.touched"> 비밀번호가 일치하지 않습니다 ! </em>
      </div>
      </div>
      <button type="submit" id="signup" [disabled]="signupForm.invalid">회원가입</button>
    </form>
    <pre>
      {{ signupForm.value | json }}
    </pre>
  `,
  styles: [`
    input, #signup {
      height: 5rem;
      width: 25rem;
      margin-top: 15px;
    }

    .alert-box {
      color: red;
    }

    #signup {
      background: #FF6464;
      color: #fff;
    }
  `]
})
export class YapenSignupComponent implements OnInit {
  signup: Signup[];
  signupForm: FormGroup;
 // url = 'http://localhost:3000/signups';
  url = 'https://api.pmb.kr/members/signup/';


  constructor(
    public http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
        ]],
      phone_number: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern(/[0-9]/)
        ]],
      passwordGroup: this.fb.group({
        password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
            Validators.pattern(/^(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-z])(?=.*[A-Z]).*$/)
          ]],
        password2: ['', Validators.required]},
        { validator: PasswordValidator.match })
    });
  }

  signUp() {
    this.signUpRequest()
    .subscribe(
        data => {
          alert('회원가입이 완료되었습니다.');
          this.router.navigate(['/main']);
        },
        error => {
          alert('회원가입에 실패하였습니다.');
        });
  }

  private signUpRequest(): Observable<Signup> {
    const payload = {
      username: this.signupForm.value.username,
      phone_number: this.signupForm.value.phone_number,
      password: this.passwordGroup.value.password,
      password2: this.passwordGroup.value.password2
    };
    return this.http.post<Signup>(this.url, payload);
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.passwordGroup.get('password');
  }

  get password2() {
    return this.passwordGroup.get('password2');
  }

  get passwordGroup() {
    return this.signupForm.get('passwordGroup');
  }

  get phone_number() {
    return this.signupForm.get('phone_number');
  }
}
