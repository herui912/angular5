import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  hobbies: any;
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { 
    this.route.params.subscribe(res=>console.log(res.id))
  }

  ngOnInit() {
    this.dataService.hobby.subscribe(res => this.hobbies = res);
  }
  sendMeUser(){
    this.router.navigate([''])
  }
}
