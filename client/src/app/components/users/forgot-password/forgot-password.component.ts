import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfoMessagesService } from 'src/app/core/services/messages/info-messages.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output() displaySignIn: EventEmitter<boolean>;
  email: string;

  constructor(private userService: UsersService, 
    private messageService: InfoMessagesService) {
    this.displaySignIn = new EventEmitter();
    this.email = '';
   }

  ngOnInit(): void {
  }

  returnToSignInPage(){
    this.displaySignIn.emit(true);
  }

  async handleForgotPassword(){
    await this.userService.handleForgotPassword(this.email);
    this.messageService.showMessage({ severity: 'success', summary: 'The reset email was send', 
    detail: 'Please, check your inbox' });

    this.returnToSignInPage();
  }
}
