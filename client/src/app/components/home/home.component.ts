import { Component, OnInit } from '@angular/core';
import { isConstructorDeclaration } from 'typescript';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  displaySignUp: boolean;
  displayResetPassword: boolean;

  constructor() { 
    this.displaySignUp = false; 
    this.displayResetPassword = false;
  }

  handleChangeForm(){
    this.displaySignUp = !this.displaySignUp;
    this.displayResetPassword = false;
  }

  handleResetPasswordDisplay(display: any){
    this.displayResetPassword = display;
  }

  handleReturnToSignUpPage(display: any){
    this.displayResetPassword = false;
  }

  ngOnInit(): void {
  }

}
