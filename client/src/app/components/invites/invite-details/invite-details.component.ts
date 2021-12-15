import { Component,  Input, OnInit } from '@angular/core';
import { IEvent } from '../../../interfaces/event.interface';
import { Invite } from '../../../interfaces/invite.interface';
import { User } from '../../../interfaces/user.interface';
import { EventsService } from '../../../core/services/events/events.service';
import { InvitesService } from '../../../core/services/invites/invites.service';
import { InfoMessagesService } from '../../../core/services/messages/info-messages.service';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-invite-details',
  templateUrl: './invite-details.component.html',
  styleUrls: ['./invite-details.component.scss']
})
export class InviteDetailsComponent implements OnInit {

  @Input() invite: Invite;

  eventOwner: User;
  inviteEvent: IEvent;
  isCollapsed = true;

  constructor(private userService: UsersService,
    private eventService: EventsService, 
    private invitesService: InvitesService,
    private messagesServices: InfoMessagesService) { }

  private async getInviteData(){
    this.eventService.getByID(this.invite.event).subscribe(async(data) => {
      this.inviteEvent = data;
      this.eventOwner = await this.userService.getUserbyID(data.user);
    });
  }

  collapseToggle(){
    this.isCollapsed = !(this.isCollapsed)
  }

  acceptInvite(){
    this.invitesService.acceptInvite(this.invite._id);
    this.messagesServices.showMessage({severity: 'success', summary: 'The invite was successful accepted', detail: ''})
  }

  declineInvite(){
    this.invitesService.deleteInvite(this.invite._id);
    this.messagesServices.showMessage({severity: 'success', summary: 'The invite was successful declined', detail: ''})
  }

  ngOnInit(): void {
    this.getInviteData();
  }
}