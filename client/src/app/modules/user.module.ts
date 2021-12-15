import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../components/users/sign-in/sign-in.component';
import { SignUpComponent } from '../components/users/sign-up/sign-up.component';
import { UserFormComponent } from '../components/users/user-form/user-form.component';
import { IconsModule } from './icons.module';
import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../core/services/users/users.service';


@NgModule({
  declarations: [
    UserFormComponent,
    SignInComponent,
    SignUpComponent,
  ],

  exports: [
    SignInComponent,
    SignUpComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    NgbModule,
    ReactiveFormsModule,
  ],

  providers: [UsersService]
})
export class UserModule { }
