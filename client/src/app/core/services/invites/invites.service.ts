import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Invite } from 'src/app/interfaces/invite.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EventGuestsService } from '../eventGuests/event-guests.service';


@Injectable({
  providedIn: 'root'
})
export class InvitesService {

  static emitEventChange = new EventEmitter();
  private readonly API = `${environment.API_URL_HTTP}/invites`;

  private invites: Observable<Invite[]>;

  constructor(private http: HttpClient,
    private eventGuestsService: EventGuestsService) {
    this.invites = this.getByUser();
  }

  getInvites(): Observable<Invite[]> {
    return this.invites;
  }

  private getByUser() {
    let params = new HttpParams();
    params = params.append('user_id', `${localStorage.getItem('user_id')}`);

    return this.http.get<Invite[]>(this.API, {
      params: params
    })
    // sem delay aqui
  }

  getById(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Invite>(this.API, {
      params: params
    })
  }

  createInvite(invite: any) {
    return this.http.post<Invite>(this.API, invite).subscribe();
  }

  deleteInvite(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.delete(this.API, {
      params: params
    }).subscribe(() => {
      this.invites = this.getByUser();
      InvitesService.emitEventChange.emit();
    })
  }

  acceptInvite(id: any) {
    this.eventGuestsService.createEventGuest(id).subscribe(() => {
      this.invites = this.getByUser();
      InvitesService.emitEventChange.emit();
    })
  }
}
