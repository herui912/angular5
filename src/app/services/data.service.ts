import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private hobbies = new BehaviorSubject<any>(['Sing', 'Movie', 'Play Butt']);
  hobby = this.hobbies.asObservable();

  constructor(public http:Http) { }

  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
    .map(res=> res.json());
  }

  changeHobby(hobby){
    this.hobbies.next(hobby);
  }

}
