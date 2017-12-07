import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { getUrlScheme } from '@angular/compiler';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<User> = [
    // new User(1, "first", "second", "email"),
    // new User(2, "first", "second", "email"),
    // new User(3, "first", "second", "email"),
    // new User(4, "first", "second", "email"),
  ];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    console.log("user.component: ngOnInit");
    this.getUsers();
  }

  create(user: User) {
    console.log("user.component: create");
    this._userService.create(user)
    .then(status => this.getUsers())
    .catch(err => console.log(err));
    this.users.push(user);
  }

  destroy(user: User){
    console.log("user.component: destroy " + user);
    this._userService.destroy(user)
    .then(status => this.getUsers())
    .catch(err => console.log(err));
    // const i = this.users.indexOf(user);
    // this.users.splice(i, 1);
  }

  update(user: User){
    console.log(user);
    this._userService.update(user)
    .then(status => this.getUsers())
    .catch(err => console.log(err));
    // const i = this.users.indexOf(users.original);
    // this.users[i] = users.edited;

  }
  getUsers(){
    console.log("user.component: getUsers");
    this._userService.getUsers()
    .then(users => this.users = users)
    .catch(err => console.log(err));
  }

}
