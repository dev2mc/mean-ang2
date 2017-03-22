import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

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

  starMultipleMails(idsArr: string[]): Promise<string[]> {
    return this.http.put(`${this._uri}/starmult`, JSON.stringify(idsArr), {headers: this.headers})
    .toPromise()
    .then((response: any) => {
      let respArr = JSON.parse(response._body);
      return respArr.data;
    })
  }

  markReadMultipleMails(idsArr: string[]): Promise<string[]> {
    return this.http.put(`${this._uri}/readmult`, JSON.stringify(idsArr), {headers: this.headers})
    .toPromise()
    .then((response: any) => {
      let respArr = JSON.parse(response._body);
      return respArr.data;
    })
  }

  deleteMail(id: string): Promise<Mail> {
    return this.http.delete(`${this._uri}/${id}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  deleteMultipleMails(idArr: string[]): Promise<string[]> {
    return this.http.delete(`${this._uri}/multiple`, new RequestOptions({headers: this.headers, body: JSON.stringify(idArr)}))
      .toPromise()
      .then((response: any) => {
        let resArr = JSON.parse(response._body);
        return resArr.data;
      });
  };
}
