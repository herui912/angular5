import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('hobbies', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform:'translateY(-75%)', offset:0}),
            style({opacity: .5, transform:'translateY(35px)', offset:.3}),
            style({opacity: 1, transform:'translateY(0)', offset: 1})
          ]))]), {optional: true}),
          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform:'translateY(0)', offset:0}),
              style({opacity: .5, transform:'translateY(35px)', offset:.3}),
              style({opacity: 0, transform:'translateY(-75%)', offset: 1})
            ]))]), {optional: true})
      ])
    ])
  ]
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address: Address;
  hobbies: String[];
  hello: any;
  posts: Post[];
  isEdit: boolean = false;

  constructor(private dataService:DataService) { 
    console.log('Constractor run');
  }

  ngOnInit() {
    console.log('ngOnInit run');   
    this.name = 'Josh'; 
    this.age = 33;
    this.email = 'Josh@butt.com'; 
    this.address = {
      street:'160th',
      city:'Redmond',
      state:'WA'
    }
    this.hello = 'hello';
    this.dataService.getPosts().subscribe((posts) =>{
      this.posts = posts;
    });
    this.dataService.hobby.subscribe(res => this.hobbies = res);
    this.dataService.changeHobby(this.hobbies);
  }
  onClick(){
    this.name='ahahaha';
    this.hobbies.push('New Hobby');
  }
  addHobby(hobby){
    console.log(hobby);
    this.hobbies.unshift(hobby);  
    this.dataService.changeHobby(this.hobbies);  
    return false;
  }
  deleteHobby(i){
    this.hobbies.splice(i, 1);
    this.dataService.changeHobby(this.hobbies);
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }

} 

interface Address{
  street: String;
  city: String;
  state: String; 
}

interface Post{
  id: number;
  title: String;
  body: String;
  userId: number;
}
