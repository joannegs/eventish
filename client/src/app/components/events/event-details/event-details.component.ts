import { Component, Input, OnInit, Output } from '@angular/core';
import { IEvent } from '../../../interfaces/event.interface';
import { EventsService } from '../../../core/services/events/events.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoMessagesService } from '../../../core/services/messages/info-messages.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { InviteFormComponent } from '../../invites/invite-form/invite-form.component';

import * as moment from 'moment';
import { EventGuestsService } from '../../../core/services/eventGuests/event-guests.service';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements OnInit {

  @Input() event: IEvent;
  @Input() isGuest: boolean;
  ref: DynamicDialogRef;
  isCollapsed = true;

  initialDate: Date;
  finalDate: Date;


  constructor(public dialogService: DialogService,
    private messagesServices: InfoMessagesService,
    private eventsService: EventsService,
    private eventGuestsService: EventGuestsService) {
    this.event = {} as IEvent;
  }

  displayUpdateEventForm() {
    this.ref = this.dialogService.open(EventFormComponent, {
      data: {
        createForm: false,
        event: this.event
      },

      header: "Event information",
      width: '45%',
      transitionOptions: '50ms cubic-bezier(0.25, 0.8, 0.25, 1)'
    });

    this.ref.onClose.subscribe((event: any) => {
      if (event) {
        this.messagesServices.showMessage({
          severity: 'success', summary: '', detail: `"${event.title}" was successful updated!`
        })
      }
    });
  }

  displayInviteForm() {
    this.ref = this.dialogService.open(InviteFormComponent, {
      data: {
        event: this.event
      },

      header: "Invite guests",
      width: '30%',
      transitionOptions: '50ms cubic-bezier(0.25, 0.8, 0.25, 1)'
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.messagesServices.showMessage({
          severity: 'success', summary: '', detail: `The invite was successful sent!`
        })
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  deleteEvent() {
    this.eventsService.deleteEvent(this.event._id);
    this.messagesServices.showMessage({
      severity: 'success', summary: '', detail: 'The event was deleted!'
    });
  }

  deleteEventInvite() {
    this.eventGuestsService.deleteEventGuest(this.event.eventGuestID)
      this.messagesServices.showMessage({
        severity: 'success', summary: '', detail: 'The event was deleted!'
      });
  }

  collapseToggle() {
    this.isCollapsed = !(this.isCollapsed);
  }

  ngOnInit(): void {
    this.initialDate = new Date((moment(this.event.startsAt)).format('DD-MMM-YYYY HH:mm:ss'));
    this.finalDate = new Date((moment(this.event.endsAt)).format('DD-MMM-YYYY HH:mm:ss'));
  }
}
