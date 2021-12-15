import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IEvent } from '../../../interfaces/event.interface';
import { EventsService } from '../../../core/services/events/events.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import * as moment from 'moment';
import { DateFormat } from '../../../interfaces/date-format-interface';
import { TimeFormat } from '../../../interfaces/time-format-interface';
import { dateAndTimeEventValidator } from '../../../shared/validators/event-form-validators';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})

export class EventFormComponent implements OnInit {

  private event: IEvent;

  eventForm: FormGroup;
  finalDateInputDisplay: boolean;
  initialDate: DateFormat;
  finalDate: DateFormat;
  inititalTime: TimeFormat;
  finalTime: TimeFormat;
  spinners: boolean;

  // define se o componente foi chamado como um componente de criação ou edição de um evento
  @Input() createForm: boolean;

  constructor(private formBuilder: FormBuilder, private eventService: EventsService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.createForm = config.data.createForm;
    if (!this.createForm) {
      this.event = config.data.event
    } else {
      this.event = {} as IEvent;
    }

    this.spinners = false;
    this.finalDateInputDisplay = false;
  }

  private buildForm() {
    this.eventForm = this.formBuilder.group({
      finalDateInputDisplay: [this.finalDateInputDisplay],
      title: [this.event.title, [Validators.required, Validators.minLength(5)]],
      description: [this.event.description, [Validators.required, Validators.minLength(20)]],
      initialDate: [this.initialDate, Validators.required],
      finalDate: [this.finalDate],
      initialHour: [this.inititalTime, [Validators.required]], 
      finalHour: [this.finalTime, [Validators.required]],
    }, 
    {
      updateOn: 'change',
      validators: dateAndTimeEventValidator
    });
  }

  private buildEvent() {
    this.event.title = this.eventForm.get('title')?.value;
    this.event.description = this.eventForm.get('description')?.value;

    let startsAtDate = this.eventForm.get('initialDate')?.value;
    let startsAtHour = this.eventForm.get('initialHour')?.value;
    let endsAtHour = this.eventForm.get('finalHour')?.value;

    this.event.startsAt = moment(`${startsAtDate.day}-${startsAtDate.month}-${startsAtDate.year} 
    ${startsAtHour.hour}:${startsAtHour.minute}`, "DD-MM-YYYY hh:mm").toDate();

    if (this.finalDateInputDisplay) {
      let endsAtDate = this.eventForm.get('finalDate')?.value;
      this.event.endsAt = moment(`${endsAtDate.day}-${endsAtDate.month}-${endsAtDate.year} 
    ${endsAtHour.hour}:${endsAtHour.minute}`, "DD-MM-YYYY hh:mm").toDate();
    } else {
      this.event.endsAt = moment(`${startsAtDate.day}-${startsAtDate.month}-${startsAtDate.year} 
    ${endsAtHour.hour}:${endsAtHour.minute}`, "DD-MM-YYYY hh:mm").toDate();
    }
  }

  handleSaveEvent() {
    this.buildEvent();

    const res = this.createForm ?
      this.eventService.createEvent(this.event) :
      this.eventService.updateEvent(this.event)
    this.ref.close(this.event)
  }

  keyPressCharacters(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 0 || charCode <= 127) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  datePickerVisibility() {
    this.finalDateInputDisplay = !this.finalDateInputDisplay;
  }

  ngOnInit(): void {
    
    if (this.event.startsAt != undefined) {
      let initial = moment(this.event.startsAt);
      let final = moment(this.event.endsAt);

      if (moment.duration(final.diff(initial)).asDays().toPrecision()[0] != "0") {
        this.finalDateInputDisplay = true;
      }

      this.initialDate = { day: initial.date(), month: initial.month() + 1, year: initial.year() };
      this.finalDate = { day: final.date(), month: final.month() + 1, year: final.year() };

      this.inititalTime = { hour: initial.hours(), minute: initial.minutes() };
      this.finalTime = { hour: final.hours(), minute: final.minutes() };
    }

    this.buildForm(); 
  }
}
