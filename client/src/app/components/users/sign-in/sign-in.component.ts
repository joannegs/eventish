import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { InfoMessagesService } from '../../../core/services/messages/info-messages.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private user: User;
  signInForm: FormGroup;
  @Output() resetPassword: EventEmitter<boolean>;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, 
    private messagesService: InfoMessagesService) {
    this.user = {} as User;
    this.resetPassword = new EventEmitter<boolean>();
  }

  private buildForm() {
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    }, { updateOn: 'blur' });
  }

  private buildUser() {
    this.user.email = this.signInForm.get('email')?.value;
    this.user.password = this.signInForm.get('password')?.value;
  }

  handleLogin() {
    if (this.signInForm.valid) {
      this.buildUser();
      this.authService.login(this.user);
    } else {
      this.messagesService.showMessage({ severity: 'error', 
      summary: 'Error while trying to log in', 
      detail: 'Invalid e-mail. The corret format must follow the patter: your@email.com' })
    }
  }

  handleResetPasswordDisplay(){
    this.resetPassword.emit(true);
  }

  /* handleReturnToSignInPage(display: any){
    this.resetPassword.emit(display);
  }
 */

  ngOnInit(): void {
    this.buildForm();
  }

}
