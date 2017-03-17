import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Todo} from '../TodoObjInterface/todo-obj.interface';

@Injectable()
export class TodoService {
  private _uri = 'http://localhost:3000/todos';
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

  getTodos(): Promise<Todo[]> {
    return this.http.get(`${this._uri}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  addTodo(todo: Todo): Promise<Todo> {
    return this.http.post(`${this._uri}`, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  deleteTodo(id: string): Promise<Todo> {
    return this.http.delete(`${this._uri}/${id}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  toggleComplete(todo: Todo): Promise<Todo> {
    let id = todo._id;
    return this.http.put(`${this._uri}/${id}`, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  }
};
