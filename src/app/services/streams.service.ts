import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class StreamsService {
  endpoint = 'https://livestream-backend-zadra.herokuapp.com/';

  constructor(
    private http: HttpClient
  ) {
  }

  // return list of live streams
  getStreams() {
    return this.http.get(`${this.endpoint}/stream/`)
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
  // fetch a specific live stream by ID
  getStream(videoId) {
    return this.http.post(`${this.endpoint}/stream/`, videoId)
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
  // refresh chat
  refreshChat(refreshChat) {
    console.log(refreshChat);
    return IntervalObservable.create(5000).flatMap(
      () => this.http.post(`${this.endpoint}/refreshChat/`, refreshChat)
    )
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
 }
