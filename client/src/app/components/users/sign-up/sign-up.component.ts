import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { InfoMessagesService } from '../../../core/services/messages/info-messages.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private user: User;
  signUpForm: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private messagesService: InfoMessagesService) {
    this.user = {} as User;
  }

  handleSignUp() {
    if (this.signUpForm.valid) {
      this.buildUser();
      this.authService.signup(this.user);
    } else {
      this.messagesService.showMessage({ severity: 'error', summary: "Invalid form input", detail: 'The data is invalid, please check the information' });
    }
  }

  private buildForm() {
    this.signUpForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern("^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)")]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    }, { updateOn: 'blur' });
  }

  private showValidationMessage(input: any) {
    switch ((input).toUpperCase()) {
      case 'NAME':
        this.messagesService.showMessage({ severity: 'warn', summary: `${(input).toUpperCase()} field has an invalid input`, detail: 'The first and last name must exist and contain only letters' });
        break;
      case 'EMAIL':
        this.messagesService.showMessage({ severity: 'warn', summary: `${(input).toUpperCase()} field has an invalid input`, detail: 'The e-mail must have the pattern yourbest@email.com' });
        break;
      case 'PASSWORD':
        this.messagesService.showMessage({ severity: 'warn', summary: `${(input).toUpperCase()} field has an invalid input`, detail: 'The password must contain at least 6 characters' });
        break;
    }
  }

  private buildUser() {
    this.user.name = this.signUpForm.get('name')?.value;
    this.user.email = this.signUpForm.get('email')?.value;
    this.user.password = this.signUpForm.get('password')?.value;
  }

  ngOnInit() {
    this.buildForm();

    Object.keys(this.signUpForm.controls).forEach((input) => {
      const inputControl = input;
      const field = this.signUpForm.get(`${input}`);

      field?.valueChanges.subscribe(() => {
        if (field.invalid) {
          this.showValidationMessage(inputControl);
        }
      })
    })
  }
}