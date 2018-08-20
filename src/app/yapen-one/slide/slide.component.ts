import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-slide',
  template: `
  <div class="sliders">
    <div class="slideWrapper">
      <ngb-carousel *ngIf="images">
        <ng-template ngbSlide>
          <img [src]="images[0]" alt="Random first slide">
        </ng-template>
        <ng-template ngbSlide>
          <img [src]="images[1]" alt="Random second slide">
        </ng-template>
        <ng-template ngbSlide>
          <img [src]="images[2]" alt="Random third slide">
        </ng-template>
      </ngb-carousel>
    </div>
    <div class="imgWrapper">
      <ngb-carousel *ngIf="imgwrapper">
        <ng-template ngbSlide>
          <img [src]="imgwrapper[0]" alt="Random first slide">
        </ng-template>
        <ng-template ngbSlide>
          <img [src]="imgwrapper[1]" alt="Random second slide">
        </ng-template>
        <ng-template ngbSlide>
          <img [src]="imgwrapper[2]" alt="Random third slide">
        </ng-template>
      </ngb-carousel>
    </div>
  </div>
  `,
  styleUrls: [`./slide.css`]
})
export class SlideComponent implements OnInit {
  images: Array<string>;
  imgwrapper: Array<string>;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
   this.images = [
     'http://img.yapen.co.kr/pension/mobile/f89f89a1549cb0e95d9775ff5466f6b3.png',
     'http://img.yapen.co.kr/pension/mobile/272acfeaf338ba82ab56157a01413919.png',
     'http://img.yapen.co.kr/pension/mobile/f74c4923421b93b915c57ec3b7ee5967.png'
   ];

   this.imgwrapper = [
    'http://www.yapen.co.kr/img/web/appDownBanner1.png',
    'http://www.yapen.co.kr/img/web/appDownBanner2.png',
    'http://www.yapen.co.kr/img/web/appDownBanner3.png'
   ];
  }
}
