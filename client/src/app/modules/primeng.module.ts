import { NgModule } from '@angular/core';
import { ToastModule}  from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [],
  imports: [
    DynamicDialogModule,
    MessagesModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    ToastModule,
  ],

  providers: [MessageService]
})
export class PrimengModule { }
