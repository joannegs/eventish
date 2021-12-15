import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InfoMessagesService } from '../messages/info-messages.service';
import { IEvent } from 'src/app/interfaces/event.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  static emitEventChange = new EventEmitter();
  private readonly API = `${environment.API_URL_HTTP}/events`;

  // eventos do usuário logado no momento
  private events: Observable<IEvent[]>;

  constructor(private http: HttpClient, private messagesService: InfoMessagesService) {
    this.events = this.getByUser();
  }

  // retorna apenas os eventos do usuário logado no momento 
  getEvents(): Observable<IEvent[]>{
    return this.events;
  }

  getByID(id: any): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.API}/${id}`);
  }

  private getByUser(): Observable<IEvent[]> {
    let params = new HttpParams();
    params = params.append('user_id', `${localStorage.getItem('user_id')}`);

    return this.http.get<IEvent[]>(this.API, {
      params: params
    })
    .pipe(
      delay(1500),
    )
  }

  /* os métodos que alteram os dados dos eventos emitem um evento a 
  ser escutado pelos componentes que utilizam os dados dos eventos */
  createEvent(event: any) {
    return this.http.post<IEvent>(this.API, event).subscribe(() => {
      this.events = this.getByUser();
      EventsService.emitEventChange.emit();
    });
  }

  updateEvent(event: any) {
    let params = new HttpParams();
    params = params.append('id', event._id);

    return this.http.put<IEvent>(this.API, event, {
      params: params
    }).subscribe(() => {
      this.events = this.getByUser();
      EventsService.emitEventChange.emit();
    });
  }

  deleteEvent(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);

      return this.http.delete(this.API, {
        params: params
      }).subscribe(() => {
        this.events = this.getByUser();
        EventsService.emitEventChange.emit();
      });
    }
}
