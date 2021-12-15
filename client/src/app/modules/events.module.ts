import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from '../components/events/event-form/event-form.component';
import { EventDetailsComponent } from '../components/events/event-details/event-details.component';
import { EventListComponent } from '../components/events/event-list/event-list.component';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../core/services/events/events.service';
import { IconsModule } from './icons.module';
import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventFormComponent,
    EventDetailsComponent,
    EventListComponent
  ],
  exports: [
    EventListComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [EventsService]
})
export class EventsModule { }
