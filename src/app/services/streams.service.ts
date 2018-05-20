import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';

@Injectable()
export class StreamsService {
  endpoint = 'https://livestream-backend-zadra.herokuapp.com/';
  // endpoint = 'http://localhost:8000';
  constructor(
    private http: HttpClient
  ) {
  }

  login(authToken) {
    return this.http.post(`${this.endpoint}/login/`, authToken)
    .catch((error: any) =>
      Observable.throw(error)
    );
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
    return this.http.post(`${this.endpoint}/refreshChat/`, refreshChat)
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
  // get chat messages from user
  getUserMessages(userId) {
    return this.http.post(`${this.endpoint}/user/`, userId)
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
 }
