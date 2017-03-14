import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Task} from '../TaskObjInterface/task-obj.interface';

@Injectable()
export class TasksService {
  private _uri = 'http://localhost:3000/tasks';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){};

  getTasks(): Promise<Task[]> {
    return this.http.get(`${this._uri}`)
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  addTask(task: Task): Promise<Task> {
    return this.http.post(`${this._uri}`, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  updateTask(task: Task): Promise<Task> {
    let id = task._id;
    return this.http.put(`${this._uri}/${id}`, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };

  deleteTask(id: string): Promise<Task> {
    return this.http.delete(`${this._uri}/${id}`, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        let resObj = JSON.parse(response._body);
        return resObj.data;
      });
  };
};
