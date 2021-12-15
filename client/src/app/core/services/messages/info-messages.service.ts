import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class InfoMessagesService {

  constructor(private messageService: MessageService) { }

  showMessage(message: {severity: string, summary: string, detail: string }){
    this.messageService.add(message);

  }

}
