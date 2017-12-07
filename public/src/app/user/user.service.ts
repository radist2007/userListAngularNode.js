import { User } from './user';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import"rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  getUsers(){
    console.log('user.service: getUsers');
    return this._http.get("/users")
    .map(data => data.json())
    .toPromise()

  }

  create(user: User){
    console.log('user.service: create');
    return this._http.post("/users", user)
    .map(data => data.json())
    .toPromise()
  }

  destroy(user: User){
    console.log('user.service" destroy ' + user.first_name)
    return this._http.delete("/users/" + user._id)
    .map(data => data.json())
    .toPromise()
  }

  update(user: User){
    return this._http.put("/users/" + user._id, user)
    .map(data => data.json())
    .toPromise()
  }

  getUser(user: User){
    return this._http.get("/users"+user._id)
    .map(data => data.json())
    .toPromise()
  }
}
