import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapen-pay',
  template: `
    <!-- yapen pay page -->
    <div class="pay-page">

    <!-- user info table -->
    <form>
      <section class="user-info">
        <table class="table table-bordered">
          <caption>예약자정보입력</caption>
          <tbody>

            <!-- 예약자 이름 -->
            <tr>
              <th scope="row">예약자 이름</th>
              <td>
                <span>
                  <input type="text">
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
                  <input type="text">
                    <span class="empty-phone-number">
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

      <table class="table table-bordered">
        <caption>결제방법</caption>
        <tbody>

          <!-- 결제수단 선택 radio button -->
          <tr>
            <th scope="row">결제수단 선택</th>
            <td>
              <span>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" aria-label="Radio button for following text input" checked> 신용카드
                      <input type="radio" aria-label="Radio button for following text input"> 무통장입금
                        <!-- Add two forms depending on what is checked -->
                      <span></span>
                    </div>
                  </div>
                </div>
              </span>
            </td>
          </tr>
          <!-- 결제수단 선택 radio button -->


          <tr>
            <th scope="row"></th>
            <td>

              <!-- 신용카드 -->
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">카드번호</th>
                    <td>
                      <input type="text"> -
                      <input type="text"> -
                      <input type="text"> -
                      <input type="text">
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">유효기간</th>
                    <td>
                      <div class="input-group mb-3">
                        <select class="custom-select">
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
                        <select class="custom-select">
                          <option selected>YY</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
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
                      <input type="password" placeholder="비밀번호 앞 2자리">
                      ●●
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">카드구분</th>
                    <td>
                      <div class="input-group-text">
                        <input type="radio" aria-label="Radio button for following text input" checked> 개인
                        <input type="radio" aria-label="Radio button for following text input"> 법인
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">생년월일</th>
                    <td>
                      <input type="text" placeholder="생년월일 6자리">
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">할부선택</th>
                    <td>
                      <select class="custom-select">
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
                    <input type="text">
                    <p class="email-help">* 입력하신 이메일 주소로 결제 내역이 발송됩니다.</p>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>

        </tbody>
      </table>
      <!-- 신용카드 -->

      <!-- 무통장입금 -->
      <table class="table table-bordered">
      <tbody>
        <tr>
          <th scope="row" style="text-align: center;">입금은행</th>
          <td>
            <select class="custom-select">
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
            <input type="text" placeholder="홍길동">
          </td>
        </tr>
      </tbody>
      </table>
      <!-- 무통장입금 -->

    </div>
    <!-- 결제수단 선택 -->


    <!-- pay button -->
    <div class="pay-btn">
      <button type="submit" class="btn btn-primary btn-lg">결제하기</button>
    </div>
    <a routerLink="/payfinish">payfinish</a>
    <!-- pay button -->

  </div>
  <!-- yapen pay page -->
  `,
  styles: []
})
export class YapenPayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
