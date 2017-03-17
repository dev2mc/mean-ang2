import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Mail} from '../MailObjInterface/mail-obj.interface';

@Injectable()
export class MailService {
  private _uri = 'http://localhost:3000/mails';
  private headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    }
  );

  constructor(private http: Http){};

  getToken() {
    return localStorage.getItem('id_token');
  }

  getMails(): Promise<Mail[]> {
    return this.http.get(`${this._uri}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  getMail(id: string): Promise<Mail> {
    return this.http.get(`${this._uri}/${id}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  sendMail(task: Mail): Promise<Mail> {
    return this.http.post(`${this._uri}`, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  updateMail(task: Mail): Promise<Mail> {
    let id = task._id;
    return this.http.put(`${this._uri}/${id}`, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  deleteMail(id: string): Promise<Mail> {
    return this.http.delete(`${this._uri}/${id}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };
}
