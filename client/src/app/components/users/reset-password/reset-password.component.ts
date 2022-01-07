import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoMessagesService } from 'src/app/core/services/messages/info-messages.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  password: string;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private userService: UsersService,
    private messageService: InfoMessagesService){
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void {
  }

  handleGoToHomePage(){
    this.router.navigate(['/']);
  }

  handleResetPassword(){
    this.userService.handleResetPassword(this.token, this.password);
    this.messageService.showMessage({ severity: 'success', summary: "The account was successful reseted", 
    detail: 'Now you can sign in using your new password'});

    this.handleGoToHomePage();
  }

}
