import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventGuest } from 'src/app/interfaces/event-guest.interface';
import { environment } from 'src/environments/environment';
import { mergeMap, delay } from 'rxjs/operators';
import { EventsService } from '../events/events.service';
import { IEvent } from 'src/app/interfaces/event.interface';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventGuestsService {

  static emitEventChange = new EventEmitter();
  private readonly API = `${environment.API_URL_HTTP}/eventsGuests`;

  private eventGuests: Observable<IEvent[]>;

  constructor(private http: HttpClient,
    private eventsServices: EventsService) { 
      this.eventGuests = this.getByUser();
    }

  getGuestEvents(): Observable<IEvent[]> {
    return this.eventGuests;
  }

  createEventGuest(inviteID: any) {
    const res =  this.http.post<EventGuest>(this.API, { invite_id: inviteID });
      this.eventGuests = this.getByUser();
      EventGuestsService.emitEventChange.emit();

      return res; 
  }
  
  private getByUser(): Observable<IEvent[]>{
    let params = new HttpParams();
    params = params.append('user_id', `${localStorage.getItem('user_id')}`);

    return from(this.http.get<EventGuest[]>(this.API, {
      params: params
    }).pipe(
      mergeMap((eventGuests => {
        const events: IEvent[] = [];

        eventGuests.forEach(eventGuest => {
          this.eventsServices.getByID(eventGuest.event).subscribe(data => {
            events.push({...data, eventGuestID: eventGuest._id});
          });
      });
      
        return of(events).pipe(
          delay(1500)
        );
      }))
    ));
  }

  deleteEventGuest(id: any){
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.delete(this.API, {
      params: params
    }).subscribe(() => {
      this.eventGuests = this.getByUser();
      EventGuestsService.emitEventChange.emit();
    });
  }
}