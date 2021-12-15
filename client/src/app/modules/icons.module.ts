import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import {
  Person, LockFill, CalendarEvent, Envelope,
  ArrowLeft, TextIndentLeft, ThreeDotsVertical, X, Pencil, FilterLeft,
  Calendar2Event, ClockFill, Clock, BoxArrowInLeft, Check
} from 'ng-bootstrap-icons/icons';

const icons = {
  Person,
  LockFill,
  CalendarEvent,
  Envelope,
  ArrowLeft,
  TextIndentLeft,
  ThreeDotsVertical,
  X,
  Pencil,
  FilterLeft,
  Calendar2Event, 
  Clock, 
  ClockFill,
  BoxArrowInLeft,
  Check
};


@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }