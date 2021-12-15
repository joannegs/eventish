import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { IEvent } from '../../../interfaces/event.interface';
import { InvitesService } from '../../../core/services/invites/invites.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Invite } from '../../../interfaces/invite.interface';
import { UsersService } from '../../../core/services/users/users.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.scss']
})
export class InviteFormComponent implements OnInit {

  message: string;
  email: string;
  invite: Invite;
  event: IEvent;
  guest: User;

  constructor(private invitesService: InvitesService,
    private userService: UsersService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.event = config.data.event;
    this.invite = {} as Invite;
    this.guest = {} as User;
  }

  ngOnInit(): void { }

  async checkGuestValidity() {
    try {
      this.guest = await this.userService.getUserbyEmail(this.email);
      this.createInvite();
    } catch (error: any) {
      this.ref.close();
    }
  }

  private createInvite() { 
    this.invite.user = this.guest._id;
    this.invite.event = this.event._id;
    this.invite.message = this.message;

    this.invitesService.createInvite(this.invite);
      this.ref.close(this.invite);
  }
}
