import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-yapen-pay',
  template: `
    <!-- yapen pay page -->
    <div class="pay-page">

    <!-- user info table -->
    <form [formGroup]="userForm" novalidate>
      <section class="user-info">
        <h2>예약자정보입력</h2>
        <table class="table table-bordered">
          <tbody>

            <!-- 예약자 이름 -->
            <tr>
              <th scope="row">예약자 이름</th>
              <td>
                <span>
                  <input type="text" formControlName="userName"
                    [style.border-color]="(isEmptyName ? 'rgb(255, 101, 89)' : '')" #inputUserName>
                  <span class="help">예) 홍길동</span>
                </span>
              </td>
            </tr>
            <!-- 예약자 이름 -->

            <!-- 휴대폰번호 -->
            <tr>
              <th scope="row">휴대폰번호</th>
              <td>
                <span>
                  <input type="text" formControlName="userPhone"
                    [style.border-color]="(isEmptyPhone ? 'rgb(255, 101, 89)' : '')" #inputUserPhone>
                    <span class="empty-phone-number" *ngIf="isEmptyPhone">
                      {{ !inputUserPhone.value ? '휴대폰번호가 입력되지 않았습니다.' :  '휴대폰번호가 정확히 입력되지 않았습니다.' }}
                    </span>
                  <span class="help">예) 0101234567</span>
                </span>
              </td>
            </tr>
            <!-- 휴대폰번호 -->

          </tbody>
        </table>
      </section>
    </form>
    <!-- user info table -->


    <!-- 결제수단 선택 -->
    <div class="payments">

      <h2>결제방법</h2>
      <table class="table table-bordered">
        <tbody>

          <!-- 결제수단 선택 radio button -->
          <tr>
            <th scope="row">결제수단 선택</th>
            <td>
              <span>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" aria-label="Radio button for following text input"
                        (change)="changeToCredit()"
                        [checked]="isCredit" #creditInput>
                      <span class="input-credit">카드간편결제</span>
                      <input type="radio" aria-label="Radio button for following text input"
                        (change)="changeToNoBankbook()"
                        [checked]="isNoBankbook"
                        class="radio-nonbankbook">
                      <span class="input-nonbankbook">무통장입금</span>
                        <!-- Add two forms depending on what is checked -->
                      <span></span>
                    </div>
                  </div>
                </div>
              </span>
            </td>
          </tr>
          <!-- 결제수단 선택 radio button -->


          <!-- 신용카드 및 무통장입금 form -->
          <tr>
            <th scope="row"></th>

            <!-- 신용카드 -->
            <form [formGroup]="creditCardForm" [style.display]="creditFormDisplay" novalidate>
              <section class="credit-card-form">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">카드번호</th>
                      <td>
                        <input type="text" formControlName="cardNumber1"> -
                        <input type="text" formControlName="cardNumber2"> -
                        <input type="text" formControlName="cardNumber3"> -
                        <input type="text" formControlName="cardNumber4">
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">유효기간</th>
                      <td>
                        <div class="input-group mb-3">
                          <select class="credit-month"
                            (change)="checkCreditMonth($event.target.value)">
                            <option selected>MM</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                          /
                          <select class="credit-year"
                            (change)="checkCreditYear($event.target.value)">
                            <option selected>YY</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">비밀번호</th>
                      <td>
                        <input type="password" placeholder="비밀번호 앞 2자리" formControlName="cardPassword">
                        ●●
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">카드구분</th>
                      <td>
                        <div class="input-group-text">
                          <input type="radio" aria-label="Radio button for following text input"
                            (change)="changeToPerson()"
                            [checked]="isPerson">
                          <span class="card-type-person">개인</span>
                          <input type="radio" aria-label="Radio button for following text input"
                            (change)="changeToCorporation()"
                            [checked]="isCorporation"
                            class="radio-corporation">
                          <span class="card-type-corporation">법인</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">생년월일</th>
                      <td>
                        <input type="text" placeholder="생년월일 6자리" formControlName="birthday">
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">할부선택</th>
                      <td>
                        <select class="custom-select"
                          (change)="checkCreditInstallment($event.target.value)">
                          <option value="01" selected>일시불</option>
                          <option value="02">2개월</option>
                          <option value="03">3개월</option>
                          <option value="04">4개월</option>
                          <option value="05">5개월</option>
                          <option value="06">6개월</option>
                          <option value="07">7개월</option>
                          <option value="08">8개월</option>
                          <option value="09">9개월</option>
                          <option value="10">10개월</option>
                          <option value="11">11개월</option>
                          <option value="12">12개월</option>
                        </select>
                        <p class="installment-help">* 5만원 미만, 법인카드는 할부적용 불가</p>
                      </td>
                    </tr>
                  <tr>
                    <th scope="row">이메일</th>
                    <td>
                      <input type="text" formControlName="email">
                      <p class="email-help">* 입력하신 이메일 주소로 결제 내역이 발송됩니다.</p>
                    </td>
                  </tr>
                  </tbody>
                  </table>
                </section>
              </form>
            <!-- 신용카드 -->

            <!-- 무통장입금 -->
            <form [formGroup]="nonBankbookForm" [style.display]="nonBankBookDisplay" novalidate>
              <section class="non-bankbook-form">
                <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row" style="text-align: center;">입금은행</th>
                    <td>
                      <select class="custom-select"
                        (change)="checkBank($event.target.value)"
                        [style.border-color]="(isBank ? 'rgb(255, 101, 89)' : '')">
                        <option value="01" selected>선택</option>
                        <option value="02">기업은행</option>
                        <option value="03">국민은행</option>
                        <option value="04">외환은행</option>
                        <option value="05">우리은행</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style="text-align: center;">입금자명</th>
                    <td>
                      <input type="text" placeholder="홍길동" formControlName="depositUserName"
                        [style.border-color]="(isEmptyDepositName ? 'rgb(255, 101, 89)' : '')">
                    </td>
                  </tr>
                </tbody>
                </table>
              </section>
            </form>
            <!-- 무통장입금 -->

          </tr>
          <!-- 신용카드 및 무통장입금 form -->

        </tbody>
      </table>

    </div>
    <!-- 결제수단 선택 -->


    <!-- pay button -->
    <div class="pay-btn">
      <button type="submit" class="btn btn-primary btn-lg"
      (click)="userName.errors ? (userPhone.errors ? isDoubleEmpty() : isEmptyName = true) :
      (userPhone.errors ? isEmptyPhone = true : getUserInfo(inputUserName.value, inputUserPhone.value))">결제하기</button>
    </div>
    <!-- pay button -->

  </div>
  <!-- yapen pay page -->
  `,
  styles: [`
    .pay-page{
      margin: 20px 10px 20px 10px;
    }
    .pay-page table th{
      background: #f7f7f7;
    }
    .pay-page input[type="text"], [type="password"], select{
      border: 2px solid #dedede;
    }
    .user-info{
      margin-bottom: 30px;
    }
    .help{
      margin-left: 7px;
      font-size: 11px;
      color: #b2b2b2;
    }
    h2{
      font-size: 16px;
      color: #ff6559;
      font-weight: bold;
    }
    .empty-phone-number{
      color: #FF6559;
      font-weight: 800;
      border: 1px solid #FF6559;
      border-color: rgb(255, 101, 89);
      border-radius: 5px 5px;
      margin-left: 5px;
    }
    .input-group-text{
      background-color: white;
      border: white;
    }
    .radio-nonbankbook{
      margin-left: 10px;
    }
    .input-credit{
      margin-left: 10px;
    }
    .input-nonbankbook{
      margin-left: 10px;
    }
    .credit-form{
      margin: 20px 20px 20px 20px;
    }
    .credit-month{
      margin-right: 10px;
    }
    .credit-year{
      margin-left: 10px;
    }
    .card-type-person{
      margin-left: 10px;
    }
    .card-type-corporation{
      margin-left: 10px;
    }
    .radio-corporation{
      margin-left: 10px;
    }
    select{
      width: 185px;
    }
    td .table th{
      text-align: center;
    }
    .installment-help{
      margin-top: 5px;
    }
    .email-help{
      margin-top: 5px;
    }
    .pay-btn{
      text-align: center;
    }
    .pay-btn button{
      width: 258px;
      height: 37px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 14px;
      background: #ff6559;
      color: #fff;
      border-color: white;
    }
  `]
})
export class YapenPayComponent implements OnInit {

  creditFormDisplay: string;
  nonBankBookDisplay: string;

  userForm: FormGroup;
  creditCardForm: FormGroup;
  nonBankbookForm: FormGroup;

  isEmptyName = false;
  isEmptyPhone = false;

  isCredit = true;
  isNoBankbook = false;

  creditMonth = 'MM';
  credityear = 'YY';

  isPerson = true;
  isCorporation = false;

  installment = '일시불';

  isBank = false;

  subscriber;
  phoneNumber;
  depositBank = '선택';
  isEmptyDepositName = false;

  urlPay = 'https://www.pmb.kr/reservation/pay/​';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.creditFormDisplay = 'block';
    this.nonBankBookDisplay = 'none';
   }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userPhone: ['', [
        Validators.required,
        Validators.pattern('[0-9]{11}')
      ]]
    });

    this.creditCardForm = this.fb.group({

        cardNumber1: ['', [
          Validators.required,
          Validators.pattern('[0-9]{4}')
        ]],

        cardNumber2: ['', [
          Validators.required,
          Validators.pattern('[0-9]{4}')
        ]],

        cardNumber3: ['', [
          Validators.required,
          Validators.pattern('[0-9]{4}')
        ]],

        cardNumber4: ['', [
          Validators.required,
          Validators.pattern('[0-9]{4}')
        ]],

        cardPassword: ['', [
          Validators.required,
          Validators.pattern('[0-9]{2}')
        ]],

        birthday: ['', [
          Validators.required,
          Validators.pattern('[0-9]{6}')
        ]],

        email: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
        ]]

    });


    this.nonBankbookForm = this.fb.group({
      depositUserName: ['', Validators.required]
    });

  }


    // -- user-info form implementation start --

    get userPhone() {
      return this.userForm.get('userPhone');
    }

    get userName() {
      return this.userForm.get('userName');
    }

    isDoubleEmpty() {
      this.isEmptyName = true;
      this.isEmptyPhone = true;
    }

    getUserInfo(userName: string, userPhone: string) {
      this.subscriber = userName;
      this.phoneNumber = userPhone;

      this.isCredit ? this.checkCardNumber() : this.checkNonBankbook();
    }

    // -- user-info form implementation end --



    // -- form-change button implementation start --

    changeToNoBankbook() {
      this.isNoBankbook = true;
      this.isCredit = false;
      this.nonBankBookDisplay = 'inline';
      this.creditFormDisplay = 'none';
    }

    changeToCredit() {
      this.isCredit = true;
      this.isNoBankbook = false;
      this.creditFormDisplay = 'inline';
      this.nonBankBookDisplay = 'none';
    }

    // -- form-change button implementation end --



    // -- credit-card form implementation start --

    get cardNumber1() {
      return this.creditCardForm.get('cardNumber1');
    }

    get cardNumber2() {
      return this.creditCardForm.get('cardNumber2');
    }

    get cardNumber3() {
      return this.creditCardForm.get('cardNumber3');
    }

    get cardNumber4() {
      return this.creditCardForm.get('cardNumber4');
    }

    get cardPassword() {
      return this.creditCardForm.get('cardPassword');
    }

    get birthday() {
      return this.creditCardForm.get('birthday');
    }

    get email() {
      return this.creditCardForm.get('email');
    }

    checkCardNumber() {
      this.cardNumber1.errors ? alert('카드번호를 정확하게 입력해 주시기 바랍니다.') :
      this.cardNumber2.errors ? alert('카드번호를 정확하게 입력해 주시기 바랍니다.') :
      this.cardNumber3.errors ? alert('카드번호를 정확하게 입력해 주시기 바랍니다.') :
      this.cardNumber4.errors ? alert('카드번호를 정확하게 입력해 주시기 바랍니다.') :
      this.checkValidPeriod();
    }

    checkValidPeriod() {
      this.creditMonth === 'MM' ? alert('유효기간을 정확하게 입력해 주시기 바랍니다.') :
      this.credityear === 'YY' ? alert('유효기간을 정확하게 입력해 주시기 바랍니다.') :
      this.checkCardPassword();
    }

    checkCreditMonth(month: string) {
      this.creditMonth = month;
    }

    checkCreditYear(year: string) {
      this.credityear = year;
    }

    checkCardPassword() {
      this.cardPassword.errors ? alert('비밀번호를 정확하게 입력해 주시기 바랍니다.') : this.checkBirthday();
    }

    changeToCorporation() {
      this.isCorporation = true;
      this.isPerson = false;
    }

    changeToPerson() {
      this.isPerson = true;
      this.isCorporation = false;
    }

    checkBirthday() {
      this.birthday.errors ? alert('생년월일을 정확하게 입력해 주시기 바랍니다.') : this.checkEmail();
    }

    checkCreditInstallment(installmentValue: string) {
      this.installment = installmentValue;
    }

    checkEmail() {
      this.email.errors ? alert('이메일을 정확하게 입력해 주시기 바랍니다.') : this.postCreditCardInfo();
    }

    getCreditCardInfo() {
      console.log('get credit card info');
    }


    // -- credit-card form implementation end --



    // -- nonBankbook form implementation start --

    checkBank(bankValue: string) {
      console.log('bank');
      this.depositBank = bankValue;
    }

    checkNonBankbook() {
      console.log('get nonbankbook info');
      this.depositBank === '선택' ? this.isBank = true :
      this.depositUserName.errors ? this.isEmptyDepositName = true :
      this.postNonBankbookInfo();
    }

    get depositUserName() {
      return this.nonBankbookForm.get('depositUserName');
    }


    // -- nonBankbook form implementation end --


    // -- post pay info implementation start --

    postCreditCardInfo() {
      console.log('post credit card');
    }

    postNonBankbookInfo() {
      console.log('post nonBankbook');
    }


    // -- post pay info implementation end --


    moveToFinishPage() {
      console.log('move');
      this.router.navigate(['payfinish']);
    }


}
