import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invite } from '../../interfaces/invite.interface';
import { AuthService } from '../../core/services/auth/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { UserFormComponent } from '../users/user-form/user-form.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ref: DynamicDialogRef;
  @Input() invites$: Observable<Invite[]>;

  constructor(private authService: AuthService,
    public dialogService: DialogService) { }

  ngOnInit(): void { }

  displayUserForm() {
    this.ref = this.dialogService.open(UserFormComponent, {

      header: "Account information",
      width: '45%',
      height: '50%',
      transitionOptions: '50ms cubic-bezier(0.25, 0.8, 0.25, 1)'
    });
  }

  logout(){
    this.authService.logout();
  }
}