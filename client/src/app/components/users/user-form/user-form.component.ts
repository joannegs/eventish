import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { UsersService } from '../../../core/services/users/users.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  
  user: User;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) { 
    }

    buildForm(){
      this.userForm = this.formBuilder.group({
        name: [this.user.name],
        email: [this.user.email]
      })
    }

  private async getUser(){
    this.user = await this.usersService.getLoggedUser();
  }

  async ngOnInit() {
    await this.getUser();
    this.buildForm();
  }
}
