import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Output() displaySignIn: EventEmitter<boolean>;

  constructor() {
    this.displaySignIn = new EventEmitter();
   }

  ngOnInit(): void {
  }

  returnToSignInPage(){
    this.displaySignIn.emit(true);
  }

}
