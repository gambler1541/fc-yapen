import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound.component';
import { YapenSearchbarComponent } from './yapen-one/yapen-searchbar.component';
import { YapenNavComponent } from './yapen-nav.component';
import { YapenPensionlistComponent } from './yapen-one/yapen-pensionlist.component';
import { YapenPensiondetailComponent } from './yapen-two/yapen-pensiondetail.component';
import { YapenImagesliderComponent } from './yapen-two/yapen-imageslider.component';
import { YapenCalendarComponent } from './yapen-two/yapen-calendar.component';
import { YapenReserveComponent } from './yapen-two/yapen-reserve.component';
import { YapenPayComponent } from './yapen-two/yapen-pay.component';
import { YapenPayfinishComponent } from './yapen-two/yapen-payfinish.component';
import { YapenLoginComponent } from './yapen-three/yapen-login.component';
import { YapenSignupComponent } from './yapen-three/yapen-signup.component';
import { YapenHeaderComponent } from './yapen-header.component';
import { YapenFooterComponent } from './yapen-footer.component';
import { YapenContainerComponent } from './yapen-container.component';

import { LocalComponent } from './yapen-one/local/local.component';
import { PeopleComponent } from './yapen-one/people/people.component';
import { ThemeComponent } from './yapen-one/theme/theme.component';
import { ConditionComponent } from './yapen-one/condition/condition.component';
import { YapenRoomlistComponent } from './yapen-one/yapen-roomlist/yapen-roomlist.component';
import { SlideComponent } from './yapen-one/slide/slide.component';
import { RangeDirective } from './range.directive';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: YapenContainerComponent},
  { path: 'pensionlist', component: YapenPensionlistComponent},
  { path: 'pensiondetail', component: YapenPensiondetailComponent},
  { path: 'reserve/:pk/:date', component: YapenReserveComponent},
  { path: 'pay', component: YapenPayComponent},
  { path: 'payfinish', component: YapenPayfinishComponent},
  { path: 'login', component: YapenLoginComponent},
  { path: 'signup', component: YapenSignupComponent},
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    YapenSearchbarComponent,
    YapenNavComponent,
    YapenPensionlistComponent,
    YapenPensiondetailComponent,
    YapenImagesliderComponent,
    YapenCalendarComponent,
    YapenReserveComponent,
    YapenPayComponent,
    YapenPayfinishComponent,
    YapenLoginComponent,
    YapenSignupComponent,
    YapenHeaderComponent,
    YapenFooterComponent,
    YapenContainerComponent,
    RangeDirective,
    LocalComponent,
    PeopleComponent,
    ThemeComponent,
    ConditionComponent,
    YapenRoomlistComponent,
    SlideComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    LocalStorageModule.withConfig({
      prefix: 'yapen',
      storageType: 'localStorage'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
