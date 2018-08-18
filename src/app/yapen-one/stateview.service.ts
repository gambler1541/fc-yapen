import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})

export class StateviewService {
  public state = '';
  public data: any = {};
  public res: any[];
  pensionList: any[];
  baseUrl = 'https://pmb.kr/search/keyword_search/';
  queryUrl = '?search=';

  constructor(private http: HttpClient) { }

  // searchTerms(terms: Observable<string>) {
  //   return terms.debounceTime(400)
  //     .distinctUntilChanged()
  //     .switchMap(term => this.search(term));
  // }


  // search(term) {
  //   return this.http
  //     .get<any[]>(this.baseUrl + this.queryUrl + term)
  //     .map(response => this.pensionList = response);
  // }

}
