import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }

  //retrieve data
  getNotification()
  {
    return this.http.get('http://localhost:3000/api/notifications/all')
      .map(res => res.json());
  }

}
