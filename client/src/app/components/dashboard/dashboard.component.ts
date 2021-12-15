import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EventFormComponent } from '../events/event-form/event-form.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoMessagesService } from '../../core/services/messages/info-messages.service';
import { EventsService } from '../../core/services/events/events.service';
import { IEvent } from '../../interfaces/event.interface';
import { InvitesService } from '../../core/services/invites/invites.service';
import { Invite } from '../../interfaces/invite.interface';
import { Observable, Subject } from 'rxjs'
import { EventGuestsService } from '../../core/services/eventGuests/event-guests.service';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  ref: DynamicDialogRef;

  events$: Observable<IEvent[]>;
  guestEvents$: Observable<IEvent[]>;
  invites$: Observable<Invite[]>;

  user: User;

  eventsOwnerDisplay: boolean;

  error$: Subject<boolean>;

  constructor(public dialogService: DialogService,
    private messagesServices: InfoMessagesService,
    private eventsService: EventsService,
    private eventGuestsServiceeventsService: EventsService,
    private invitesServices: InvitesService,
    private eventGuestsService: EventGuestsService, 
    private usersService: UsersService) {
    this.eventsOwnerDisplay = true;
    this.error$ = new Subject<boolean>()
  }

  private getInvites() {
    this.invites$ = this.invitesServices.getInvites();
  }

  private getEvents() {
    this.events$ = this.eventsService.getEvents();
  }

  private getGuestEvents() {
    this.guestEvents$ = this.eventGuestsService.getGuestEvents();
  }

  displayNewEventForm() {
    this.ref = this.dialogService.open(EventFormComponent, {
      data: {
        createForm: true
      },

      header: "Event information",
      width: '45%',
      transitionOptions: '50ms cubic-bezier(0.25, 0.8, 0.25, 1)'
    });

    this.ref.onClose.subscribe((event: any) => {
      if (event) {
        this.messagesServices.showMessage({
          severity: 'success', summary: '', detail: `"${event.title}" was successful saved!`
        })
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  handleChangeDisplay() {
    this.eventsOwnerDisplay = !this.eventsOwnerDisplay;
  }

  ngOnInit(): void {
    this.getInvites();
    this.getGuestEvents();
    this.getEvents();

    EventGuestsService.emitEventChange.subscribe(() => {
      this.getGuestEvents();
    });

   EventsService.emitEventChange.subscribe(() => {
      this.getEvents();
    });

    InvitesService.emitEventChange.subscribe(() => {
      this.getInvites();
    });
  }
}
