import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  displaySignUp: boolean;

  constructor() { 
    this.displaySignUp = false; 
  }

  handleChangeForm(){
    this.displaySignUp = !this.displaySignUp;
  }

  ngOnInit(): void {
  }

}
