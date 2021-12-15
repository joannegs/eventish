import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteFormComponent } from '../components/invites/invite-form/invite-form.component';
import { InviteDetailsComponent } from '../components/invites/invite-details/invite-details.component';
import { IconsModule } from './icons.module';
import { InvitesService } from '../core/services/invites/invites.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InviteFormComponent,
    InviteDetailsComponent
  ],
  
  exports: [
    InviteDetailsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [InvitesService]
})
export class InviteModule { }
