import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../../interfaces/event.interface';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {

  @Input() events: IEvent[];
  @Input() isGuest: boolean;

  constructor() {}
  
  ngOnInit(): void { }
}
